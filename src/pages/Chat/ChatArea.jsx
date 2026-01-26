// import React, { useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addMessage, updateLastMessage } from "../../api/conversationSlice";
// import useChatStream from "../../hooks/UseChatStream.jsx";
// import { endpoints } from "../../api/config";
// import {useGenericMutation } from "../../api/apiSlice.jsx";
// import { downloadFileFromBlob } from "../../utils/HelperFunction.js";

// const ChatArea =()=> {
//   const dispatch = useDispatch();
//   const inputRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const { conversations, activeConvId } = useSelector(
//     (state) => state.conversation,
//   );

//   const activeConv = conversations?.find((c) => c.id === activeConvId);

//   const { streamChat, abort, loading } = useChatStream();
//   const [ChatPreview] = useGenericMutation();

//   const scrollToBottom = () =>
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   const handleView = async (ref) => {
//     try {
//       const res = await ChatPreview({
//         endpoint: endpoints.Chat.reference,
//         body: {
//           "Document Name": ref.document_name,
//           Page: ref.page,
//         },
//       }).unwrap();

//       const url = URL.createObjectURL(res);
//       window.open(url, "_blank");
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleDownload = async (ref) => {
//     try {
//       const res = await ChatPreview({
//         endpoint: endpoints.Chat.reference,
//         body: {
//           "Document Name": ref.document_name,
//           Page: ref.page,
//         },
//       }).unwrap();

//       downloadFileFromBlob(res, ref.document_name);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleSend = async () => {
//     const val = inputRef.current.value.trim();
//     if (!val || loading) return;

//     inputRef.current.value = "";

//     dispatch(
//       addMessage({
//         convId: activeConvId,
//         message: { role: "user", content: val },
//       }),
//     );

//     dispatch(
//       addMessage({
//         convId: activeConvId,
//         message: { role: "assistant", content: "", references: [] },
//       }),
//     );

//     setTimeout(scrollToBottom, 100);

//     await streamChat({
//       endpoint: endpoints.Chat.response,
//       data: { query: val },

//       onStream: (content) => {
//         dispatch(updateLastMessage({ convId: activeConvId, content }));
//         scrollToBottom();
//       },

//       onComplete: (references) => {
//         if (references?.length) {
//           dispatch(
//             updateLastMessage({
//               convId: activeConvId,
//               references,
//             }),
//           );
//         }
//         scrollToBottom();
//       },

//       onError: (err) => {
//         dispatch(
//           updateLastMessage({
//             convId: activeConvId,
//             content: `Error: ${err}`,
//           }),
//         );
//         scrollToBottom();
//       },
//     });
//   };

//   return (
//     <div className="d-flex flex-column h-100">
//       <div className="flex-grow-1 overflow-auto p-3">
//         {activeConv?.messages.map((msg, idx) => (
//           <div key={idx} className="mb-4">
//             <div
//               className={`d-flex ${
//                 msg.role === "user"
//                   ? "justify-content-end"
//                   : "justify-content-start"
//               }`}
//             >
//               <div
//                 className={`p-2 rounded-3 ${
//                   msg.role === "user"
//                     ? "bg-primary text-white"
//                     : "bg-light border"
//                 }`}
//                 style={{ fontSize: "15px", maxWidth: "75%" }}
//               >
//                 {msg.content ||
//                   (loading && idx === activeConv.messages.length - 1 ? (
//                     <div className="typing-wave">
//                       <span />
//                       <span />
//                       <span />
//                       <span />
//                     </div>
//                   ) : (
//                     ""
//                   ))}
//               </div>
//             </div>

//             {msg.role === "assistant" && msg.references?.length > 0 && (
//               <div className="mt-2" style={{ maxWidth: "85%" }}>
//                 <div className="text-muted small mb-2">
//                   <strong>📚 Sources</strong>
//                 </div>

//                 {msg.references.map((ref, refIdx) => (
//                   <div
//                     key={refIdx}
//                     className="card mb-2 border-start border-primary border-3"
//                   >
//                     <div className="card-body p-2">
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <strong className="text-primary">
//                             {ref.document_name}
//                           </strong>

//                           {ref.rawPage && (
//                             <span className="text-muted ms-2">
//                               {ref.rawPage}
//                             </span>
//                           )}
//                         </div>

//                         {ref.score && (
//                           <span className="badge bg-light text-dark">
//                             Score: {ref.score.toFixed(2)}
//                           </span>
//                         )}
//                       </div>
//                       <div className="mt-2 d-flex gap-2">
//                         <button
//                           className="btn btn-sm btn-outline-primary"
//                           onClick={() => handleView(ref)}
//                         >
//                           View
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-secondary"
//                           onClick={() => handleDownload(ref)}
//                         >
//                           Download
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* ================= INPUT ================= */}
//       <div className="p-2 ">
//         <div className="d-flex gap-2">
//           <input
//             ref={inputRef}
//             className="form-control rounded-pill px-4"
//             placeholder="Ask anything..."
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             disabled={loading}
//           />
//           <button
//             className="btn btn-dark rounded-circle"
//             style={{ width: 45, height: 45 }}
//             onClick={loading ? abort : handleSend}
//           >
//             {loading ? "■" : "➤"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatArea;

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../api/conversationSlice";

function ChatArea() {
  const dispatch = useDispatch();
  const { conversations, activeConvId } = useSelector(
    (state) => state.conversation,
  );
  const activeConv = conversations.find((c) => c.id === activeConvId);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConv?.messages, isTyping]);

  // Speech Recognition Logic (kept same as your code)
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.onresult = (e) =>
        setInput(
          Array.from(e.results)
            .map((r) => r[0].transcript)
            .join(""),
        );
      recognitionInstance.onend = () => setIsListening(false);
      setRecognition(recognitionInstance);
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) return alert("Speech recognition not supported");
    isListening ? recognition.stop() : recognition.start();
    setIsListening(!isListening);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userInput = input;
    setInput("");
    dispatch(
      addMessage({
        convId: activeConvId,
        message: { role: "user", content: userInput },
      }),
    );
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "google/gemma-3-27b-it:free",
            messages: [{ role: "user", content: userInput }],
          }),
        },
      );
      const data = await response.json();
      dispatch(
        addMessage({
          convId: activeConvId,
          message: {
            role: "assistant",
            content: data.choices?.[0]?.message?.content || "No response",
          },
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-viewport custom-scrollbar">
        {activeConv?.messages.length === 0 ? (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <h2 style={{ color: "var(--text)", opacity: 0.6 }}>
              Where should we begin?
            </h2>
          </div>
        ) : (
          <>
            {activeConv?.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-row ${msg.role === "user" ? "user" : "assistant"}`}
              >
                <div
                  className={`chat-bubble ${msg.role === "user" ? "user-bubble" : "assistant-bubble"}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="typing-wave typing-bubble  assistant-bubble">
                <span />
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Fixed Input Section */}
      <div className="chat-input-section">
        <div className="input-wrapper">
          <input
            type="text"
            className="chat-input-field"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />

          {/* Voice Btn */}
          <button
            className="btn btn-link p-1"
            onClick={toggleListening}
            style={{ color: isListening ? "red" : "inherit" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            </svg>
          </button>

          {/* Send Btn */}
          <button
            className="btn p-0 d-flex align-items-center justify-content-center"
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: input.trim() ? "var(--primary)" : "#ccc",
              color: "white",
              border: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;

//   return (
//     <div className="d-flex flex-column h-100">
//       {/* Messages Area */}
//       <div
//         className="flex-grow-1 overflow-y-auto  "
//         style={{ paddingBottom: "20px" }}
//       >
//         {activeConv?.messages.length === 0 ? (
//           <div className="d-flex align-items-center justify-content-center h-100 px-3">
//             <div className="text-center">
//               <h2
//                 className="mb-4"
//                 style={{
//                   fontSize: "clamp(24px, 5vw, 32px)",
//                   fontWeight: "500",
//                   color: "var(--text)",
//                 }}
//               >
//                 Where should we begin?
//               </h2>
//             </div>
//           </div>
//         ) : (
//           <div className="p-3 p-md-4">
//             {activeConv?.messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`message-row ${msg.role === "user" ? "user" : "assistant"}`}
//               >
//                 <div
//                   className={`chat-bubble ${
//                     msg.role === "user" ? "user-bubble" : "assistant-bubble"
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}

//             {isTyping && (
//               <div className="typing-wave">
//                 <span />
//                 <span />
//                 <span />
//                 <span />
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div
//         className="px-3 px-md-4 pb-md-4"
//         style={{
//           flexShrink: 0,
//           paddingTop: "12px",
//           paddingBottom: "50px",
//         }}
//       >
//         <div
//           className="position-relative mx-auto"
//           style={{ maxWidth: "800px" }}
//         >
//           <div
//             className="d-flex align-items-center"
//             style={{
//               backgroundColor: "#f9f9f9",
//               border: "1px solid #e5e5e5",
//               borderRadius: "24px",
//               padding: "4px 8px 4px 12px",
//             }}
//           >

//             <input
//               type="text"
//               className="form-control border-0"
//               placeholder="Ask anything"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSend()}
//               style={{
//                 backgroundColor: "transparent",
//                 boxShadow: "none",
//                 fontSize: "clamp(14px, 2vw, 15px)",
//                 padding: "8px 8px",
//               }}
//             />

//             {/* Voice to Text Button */}
//             <button
//               className="btn btn-sm p-1 me-2"
//               onClick={toggleListening}
//               style={{
//                 border: "none",
//                 backgroundColor: isListening ? "#ff4444" : "transparent",
//                 borderRadius: "50%",
//                 transition: "all 0.3s ease",
//               }}
//               title={isListening ? "Stop listening" : "Start voice input"}
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke={isListening ? "white" : "currentColor"}
//                 strokeWidth="2"
//               >
//                 <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
//                 <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
//                 <line x1="12" y1="19" x2="12" y2="23"></line>
//                 <line x1="8" y1="23" x2="16" y2="23"></line>
//               </svg>
//             </button>

//             {/* Send Button */}
//             <button
//               className="btn btn-sm rounded-circle"
//               onClick={handleSend}
//               disabled={!input.trim() || isTyping}
//               style={{
//                 width: "32px",
//                 height: "32px",
//                 backgroundColor: input.trim() ? "#000" : "#e5e5e5",
//                 color: "white",
//                 border: "none",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 padding: 0,
//                 flexShrink: 0,
//               }}
//             >
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
