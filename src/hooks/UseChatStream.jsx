import { useRef, useState } from "react";
import { baseUrl } from "../api/config";

const useChatStream = () => {
  const abortControllerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const streamChat = async ({
    endpoint,
    data,
    onStream,
    onComplete,
    onError,
  }) => {
    setLoading(true);
    abortControllerRef.current = new AbortController();
    let accumulated = "";
    let finalReferences = [];
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: abortControllerRef.current.signal,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || errorData.message || "Server error",
        );
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;
          try {
            const json = JSON.parse(jsonStr); 
            if (json.content) {
              accumulated += json.content;
              onStream?.(accumulated);
            } 
            if (json.references?.length) {
              finalReferences.push(
                ...json.references.map((ref) => ({
                  response_line: ref.response_line || "",
                  document_name: ref.document_name || "Unknown document",
                  page: Number(ref.page)|| null,
                   rawPage: ref.page || null, 
                  score: ref.score || null,
                })),
              );
            }
          } catch (err) {
            console.error("Parse error:", err);
          }
        }
      } 
      onComplete?.(finalReferences);
    } catch (e) {
      if (e.name !== "AbortError") onError?.(e.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    streamChat,
    abort: () => abortControllerRef.current?.abort(),
    loading,
  };
};
export default useChatStream;
