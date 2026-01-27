import { useRef, useState, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "../api/config";

const useChatStream = () => {
  const abortControllerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

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
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}${endpoint}`,
        data,
        headers: { 
          "Content-Type": "application/json",
          "Accept": "text/event-stream" 
        },
        responseType: 'stream', 
        adapter: 'fetch', 
        signal: abortControllerRef.current.signal,
      });

      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
    
        const parts = buffer.split("\n");
        buffer = parts.pop() || "";

        for (const line of parts) {
          const trimmedLine = line.trim();
        
          if (!trimmedLine || !trimmedLine.startsWith("data:")) continue;
          const jsonStr = trimmedLine.replace(/^data:\s*/, "");
          
          if (jsonStr === "[DONE]") break;

          try {
            const json = JSON.parse(jsonStr);

            if (json.content) {
              accumulated += json.content;
              onStream?.(accumulated);
            }

            if (json.references && Array.isArray(json.references)) {
              const formattedRefs = json.references.map((ref) => ({
                response_line: ref.response_line ?? "",
                document_name: ref.document_name ?? "Unknown document",
                page: ref.page ?? null,
                score: ref.score ?? null,
              }));
              finalReferences.push(...formattedRefs);
            }
          } catch (err) {
            console.warn("Skipping partial chunk:", jsonStr);
          }
        }
      }

      onComplete?.(finalReferences);

    } catch (e) {
      if (axios.isCancel(e) || e.name === "AbortError") {
        console.log("Stream stopped by user");
      } else {
        const errorMessage = e.response?.data?.detail || e.message || "FastAPI Stream Error";
        onError?.(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    streamChat,
    abort,
    loading,
  };
};

export default useChatStream;