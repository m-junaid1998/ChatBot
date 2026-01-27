import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, updateLastMessage } from "../../api/conversationSlice";
import useChatStream from "../../hooks/UseChatStream.jsx";
import { endpoints } from "../../api/config";
import { useReferenceRequestMutation } from "../../api/apiSlice.jsx";
import {
  downloadFileFromBlob,
  getErrorMessage,
} from "../../utils/HelperFunction.js";
import useVoiceChat from "../../hooks/useVoiceChat.jsx";

const MicIcon = ({ isRecording }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={isRecording ? "#ff4d4d" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const ChatArea = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const { conversations, activeConvId } = useSelector(
    (state) => state.conversation,
  );
  const activeConv = conversations?.find((c) => c.id === activeConvId);

  const { streamChat, abort, loading } = useChatStream();
  const { isRecording, isProcessing, startRecording, stopAndSend } =
    useVoiceChat();
  const [BlobRequest] = useReferenceRequestMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages, loading]);

  const handleSend = async (overrideText) => {
    const val = (
      typeof overrideText === "string" ? overrideText : input
    ).trim();
    if (!val || loading) return;

    setInput("");
    dispatch(
      addMessage({
        convId: activeConvId,
        message: { role: "user", content: val },
      }),
    );
    dispatch(
      addMessage({
        convId: activeConvId,
        message: { role: "assistant", content: "", references: [] },
      }),
    );

    await streamChat({
      endpoint: endpoints.chat.response,
      data: { query: val },
      onStream: (content) =>
        dispatch(updateLastMessage({ convId: activeConvId, content })),
      onComplete: (references) =>
        references?.length &&
        dispatch(updateLastMessage({ convId: activeConvId, references })),
      onError: (err) => {
        const errorMessage = getErrorMessage(err);
        dispatch(
          updateLastMessage({
            convId: activeConvId,
            content: `Error: ${errorMessage}`,
          }),
        );
      },
    });
  };

  const handleVoiceInput = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      try {
        const result = await stopAndSend(endpoints.chat.audio);
        if (result) {
          setInput(result.transcription);
          handleSend(result.translation);
        }
      } catch (error) {
        const customMsg = "Voice recognition failed";
        toast.error(getErrorMessage(error, customMsg));
      }
    }
  };

  const handleAction = async (ref, actionType) => {
    try {
      const res = await BlobRequest({
        endpoint: endpoints.chat.reference,
        body: { "Document Name": ref.document_name, Page: ref.page },
      }).unwrap();

      if (actionType === "view") {
        const url = URL.createObjectURL(res);
        window.open(url, "_blank");
      } else {
        downloadFileFromBlob(res, ref.document_name);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-viewport custom-scrollbar">
        {activeConv?.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-row ${msg.role === "user" ? "user" : "assistant"}`}
          >
            <div
              className={`chat-bubble ${msg.role === "user" ? "user-bubble" : "assistant-bubble"}`}
            >
              {msg.role === "assistant" &&
              !msg.content &&
              loading &&
              idx === activeConv.messages.length - 1 ? (
                <div className="typing-wave">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                <div
                  className={`message-content ${msg.content.includes("Error:") ? "error-text" : ""}`}
                >
                  {msg.content}
                </div>
              )}

              {msg.role === "assistant" && msg.references?.length > 0 && (
                <div className="sources-section">
                  <div className="sources-title">Chat References</div>
                  {msg.references.map((ref, rIdx) => (
                    <div key={rIdx} className="source-item">
                      <div className="source-info">
                        <div className="source-left">
                          <span className="source-name">
                            {ref.document_name}
                          </span>
                          <span className="source-page">
                            {" "}
                            Page Number : {ref.page}
                          </span>
                        </div>
                        <span className="source-percentage">
                          {(ref.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="source-btns">
                        <button
                          onClick={() => handleAction(ref, "view")}
                          className="view-btn"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleAction(ref, "download")}
                          className="download-btn"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-section">
        <div className="input-wrapper">
          <input
            type="text"
            className="chat-input-field"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <div className="input-actions">
            <button
              className={`mic-btn ${isRecording ? "pulse-red" : ""}`}
              onClick={handleVoiceInput}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="mini-spinner" />
              ) : (
                <MicIcon isRecording={isRecording} />
              )}
            </button>
            <button
              className={`send-btn-modern ${loading ? "loading-active" : ""}`}
              onClick={loading ? abort : handleSend}
              disabled={!input.trim() && !loading}
            >
              {loading ? (
                <span className="stop-icon">■</span>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;

// import React, { useState, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addMessage } from "../../api/conversationSlice";

// function ChatArea() {
//   const dispatch = useDispatch();
//   const { conversations, activeConvId } = useSelector(
//     (state) => state.conversation,
//   );
//   const activeConv = conversations.find((c) => c.id === activeConvId);

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [activeConv?.messages, isTyping]);

//   // Speech Recognition Logic (kept same as your code)
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = false;
//       recognitionInstance.interimResults = true;
//       recognitionInstance.onresult = (e) =>
//         setInput(
//           Array.from(e.results)
//             .map((r) => r[0].transcript)
//             .join(""),
//         );
//       recognitionInstance.onend = () => setIsListening(false);
//       setRecognition(recognitionInstance);
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognition) return alert("Speech recognition not supported");
//     isListening ? recognition.stop() : recognition.start();
//     setIsListening(!isListening);
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userInput = input;
//     setInput("");
//     dispatch(
//       addMessage({
//         convId: activeConvId,
//         message: { role: "user", content: userInput },
//       }),
//     );
//     setIsTyping(true);

//     try {
//       const response = await fetch(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization:
//               "Bearer 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",
//           },
//           body: JSON.stringify({
//             model: "google/gemma-3-27b-it:free",
//             messages: [{ role: "user", content: userInput }],
//           }),
//         },
//       );
//       const data = await response.json();
//       dispatch(
//         addMessage({
//           convId: activeConvId,
//           message: {
//             role: "assistant",
//             content: data.choices?.[0]?.message?.content || "No response",
//           },
//         }),
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages-viewport custom-scrollbar">
//         {activeConv?.messages.length === 0 ? (
//           <div className="h-100 d-flex align-items-center justify-content-center">
//             <h2 style={{ color: "var(--text)", opacity: 0.6 }}>
//               Where should we begin?
//             </h2>
//           </div>
//         ) : (
//           <>
//             {activeConv?.messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`message-row ${msg.role === "user" ? "user" : "assistant"}`}
//               >
//                 <div
//                   className={`chat-bubble ${msg.role === "user" ? "user-bubble" : "assistant-bubble"}`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//               <div className="typing-wave typing-bubble  assistant-bubble">
//                 <span />
//                 <span />
//                 <span />
//                 <span />
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </>
//         )}
//       </div>

//       {/* Fixed Input Section */}
//       <div className="chat-input-section">
//         <div className="input-wrapper">
//           <input
//             type="text"
//             className="chat-input-field"
//             placeholder="Ask anything..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleSend()}
//           />

//           {/* Voice Btn */}
//           <button
//             className="btn btn-link p-1"
//             onClick={toggleListening}
//             style={{ color: isListening ? "red" : "inherit" }}
//           >
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
//               <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
//             </svg>
//           </button>

//           {/* Send Btn */}
//           <button
//             className="btn p-0 d-flex align-items-center justify-content-center"
//             onClick={handleSend}
//             disabled={!input.trim()}
//             style={{
//               width: "32px",
//               height: "32px",
//               borderRadius: "50%",
//               backgroundColor: input.trim() ? "var(--primary)" : "#ccc",
//               color: "white",
//               border: "none",
//             }}
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatArea;
