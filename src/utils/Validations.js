export const validationRules = {
  required: (fieldName, customMsg) => (value) =>
    value?.toString().trim() !== "" || customMsg || `${fieldName} is required.`,
  email:
    (customMsg = "Invalid email format.") =>
    (value) =>
      /^\S+@\S+\.\S+$/.test(value) || customMsg,
  minLength: (min, fieldName, customMsg) => (value) =>
    value.length >= min ||
    customMsg ||
    `${fieldName} must be at least ${min} characters.`,

  maxLength: (max, fieldName, customMsg) => (value) =>
    value.length <= max ||
    customMsg ||
    `${fieldName} must be less than ${max} characters.`,

  number: (fieldName, customMsg) => (value) =>
    !isNaN(value) || customMsg || `${fieldName} must be a number.`,

  range: (min, max, fieldName, customMsg) => (value) =>
    (value >= min && value <= max) ||
    customMsg ||
    `${fieldName} must be between ${min} and ${max}.`,

  regex:
    (pattern, customMsg = "Invalid format.") =>
    (value) =>
      pattern.test(value) || customMsg,
};

import { toast } from "react-toastify";
import * as XLSX from "xlsx-js-style";
export const filetypes = [
  {
    label: "JPEG ",
    value: "image/jpeg",
    extensions: [".jpeg"],
  },

  {
    label: "PNG",
    value: "image/png",
    extensions: [".png"],
  },
  {
    label: "PDF",
    value: "application/pdf",
    extensions: [".pdf"],
  },
  {
    label: "Word",
    value:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extensions: [".doc", ".docx"],
  },
  {
    label: "Excel",
    value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extensions: [".xls", ".xlsx"],
  },
];

export function validateFile(file, acceptedTypes, acceptedExtensions = []) {
  if (!file) {
    toast.error("No file selected");
    return false;
  }

  const allowedMimeTypes = acceptedTypes
    .split(",")
    .map((type) => type.trim().toLowerCase());

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  const hasValidMime = allowedMimeTypes.some((allowed) => {
    if (allowed.endsWith("/*")) {
      const baseType = allowed.split("/")[0];
      return fileType.startsWith(baseType + "/");
    }
    return fileType === allowed;
  });

  const hasValidExtension = acceptedExtensions.some((ext) =>
    fileName.endsWith(ext.toLowerCase()),
  );

  if (!hasValidMime || !hasValidExtension) {
    toast.error("Invalid file type");
    return false;
  }

  return true;
}

export const filetypeMap = Object.fromEntries(
  filetypes.map((f) => [f.value, f]),
);

export const assignrole = [
  { label: "Role", value: 1 },
  { label: "User", value: 2 },
];

export function downloadExcel(attachment) {
  const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${attachment}`;
  const downloadLink = document.createElement("a");
  const fileName = `excel.xlsx`;

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

export function add3Dots(string, limit) {
  var dots = "...";
  if (string?.length > limit) {
    string = string?.substring(0, limit) + dots;
  }

  return string;
}

export const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str?.toUpperCase());
};

export const validateEmptyObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Invalid object provided.");
  }

  for (let key in obj) {
    const value = obj[key];

    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    ) {
      toast.error(`Please enter ${formatLabel ? formatLabel(key) : key}`);
      throw new Error(`Please enter ${formatLabel ? formatLabel(key) : key}`);
    }
  }

  return obj;
};

export const SelectAllOptions = (selected, optionsList, dataArray) => {
  let temp = [];
  const isSelectAll = selected?.some((option) => option?.value === "*");

  if (isSelectAll) {
    const alreadyAllSelected = dataArray?.length === optionsList?.length - 1;
    if (alreadyAllSelected) {
      temp = [];
    } else {
      temp = optionsList?.slice(1)?.map((item) => item?.value);
    }
  } else {
    temp = selected?.map((item) => item.value) || [];
  }

  return temp;
};

// import React, { useState, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addMessage } from "../../api/conversationSlice";

// function ChatArea() {
//   const dispatch = useDispatch();
//   const { conversations, activeConvId } = useSelector(
//     (state) => state.conversation
//   );
//   const activeConv = conversations.find((c) => c.id === activeConvId);

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [showAttachMenu, setShowAttachMenu] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   const messagesEndRef = useRef(null);
//   const attachMenuRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [activeConv?.messages]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         attachMenuRef.current &&
//         !attachMenuRef.current.contains(event.target)
//       ) {
//         setShowAttachMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Speech Recognition Setup
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognitionInstance = new SpeechRecognition();

//       recognitionInstance.continuous = false;
//       recognitionInstance.interimResults = true;
//       recognitionInstance.lang = "en-US";

//       recognitionInstance.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0])
//           .map((result) => result.transcript)
//           .join("");

//         setInput(transcript);
//       };

//       recognitionInstance.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//         setIsListening(false);
//       };

//       recognitionInstance.onend = () => {
//         setIsListening(false);
//       };

//       setRecognition(recognitionInstance);
//     }
//   }, []);

//   const toggleListening = () => {
//     if (!recognition) {
//       alert(
//         "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari."
//       );
//       return;
//     }

//     if (isListening) {
//       recognition.stop();
//       setIsListening(false);
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     dispatch(addMessage({ convId: activeConvId, message: userMessage }));

//     const userInput = input;
//     setInput("");
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
//             "HTTP-Referer": "http://localhost:3000",
//           },
//           body: JSON.stringify({
//             model: "google/gemma-3-27b-it:free",
//             messages: [{ role: "user", content: userInput }],
//           }),
//         }
//       );

//       const data = await response.json();

//       const assistantMessage = {
//         role: "assistant",
//         content: data.choices?.[0]?.message?.content || "No response from API.",
//       };

//       dispatch(addMessage({ convId: activeConvId, message: assistantMessage }));
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage = {
//         role: "assistant",
//         content: "Sorry, I encountered an error. Please try again.",
//       };
//       dispatch(addMessage({ convId: activeConvId, message: errorMessage }));
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className="d-flex flex-column h-100">
//       {/* Messages Area */}
//       <div
//         className="flex-grow-1 overflow-auto overflow-hidden"
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
//                   color: "#202020",
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
//                 className={`mb-3 mb-md-4 d-flex ${
//                   msg.role === "user"
//                     ? "justify-content-end"
//                     : "justify-content-start"
//                 }`}
//               >
//                 <div
//                   className={`p-3 rounded-3 ${
//                     msg.role === "user" ? "bg-primary text-white" : "bg-light"
//                   }`}
//                   style={{
//                     maxWidth: "85%",
//                     fontSize: "clamp(14px, 2vw, 15px)",
//                     lineHeight: "1.6",
//                   }}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//               <div className="mb-3 mb-md-4 d-flex justify-content-start">
//                 <div className="loader" aria-label="Loading...">
//                   <div className="dot"></div>
//                   <div className="dot"></div>
//                   <div className="dot"></div>
//                 </div>
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
//           backgroundColor: "white",
//           flexShrink: 0,
//           paddingTop: "12px",
//           paddingBottom: "50px",
//           position: "sticky",
//           bottom: 0,
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
//             <div className="position-relative" ref={attachMenuRef}>
//               <button
//                 className="btn btn-sm p-1"
//                 style={{ border: "none", backgroundColor: "transparent" }}
//                 onClick={() => setShowAttachMenu(!showAttachMenu)}
//               >
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <line x1="12" y1="5" x2="12" y2="19"></line>
//                   <line x1="5" y1="12" x2="19" y2="12"></line>
//                 </svg>
//               </button>

//               {showAttachMenu && (
//                 <div
//                   className="position-absolute bg-white rounded-3 shadow-lg p-2"
//                   style={{
//                     bottom: "45px",
//                     left: "0",
//                     minWidth: "220px",
//                     zIndex: 1000,
//                     border: "1px solid #e5e5e5",
//                   }}
//                 >
//                   <div
//                     className="d-flex align-items-center p-2 mb-1"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#f5f5f5")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "transparent")
//                     }
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       className="me-2"
//                     >
//                       <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
//                     </svg>
//                     <span>Add photos & files</span>
//                   </div>
//                   <div
//                     className="d-flex align-items-center p-2 mb-1"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#f5f5f5")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "transparent")
//                     }
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       className="me-2"
//                     >
//                       <rect
//                         x="3"
//                         y="3"
//                         width="18"
//                         height="18"
//                         rx="2"
//                         ry="2"
//                       ></rect>
//                       <circle cx="8.5" cy="8.5" r="1.5"></circle>
//                       <polyline points="21 15 16 10 5 21"></polyline>
//                     </svg>
//                     <span>Create image</span>
//                   </div>
//                   <div
//                     className="d-flex align-items-center p-2 mb-1"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#f5f5f5")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "transparent")
//                     }
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       className="me-2"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <path d="M12 6v6l4 2"></path>
//                     </svg>
//                     <span>Thinking</span>
//                   </div>
//                   <div
//                     className="d-flex align-items-center p-2 mb-1"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#f5f5f5")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "transparent")
//                     }
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       className="me-2"
//                     >
//                       <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
//                       <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
//                       <line x1="12" y1="22.08" x2="12" y2="12"></line>
//                     </svg>
//                     <span>Deep research</span>
//                   </div>
//                   <div
//                     className="d-flex align-items-center p-2 mb-1"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#f5f5f5")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "transparent")
//                     }
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       className="me-2"
//                     >
//                       <circle cx="9" cy="21" r="1"></circle>
//                       <circle cx="20" cy="21" r="1"></circle>
//                       <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//                     </svg>
//                     <span>Shopping research</span>
//                   </div>
//                   <div
//                     className="d-flex align-items-center p-2"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#f5f5f5")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "transparent")
//                     }
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       className="me-2"
//                     >
//                       <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
//                       <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
//                     </svg>
//                     <span>Study and learn</span>
//                   </div>
//                 </div>
//               )}
//             </div>

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

// export default ChatArea;

// import React, { useState, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addMessage,
//   updateConversation,
//   updateLastMessage,
// } from "../../api/conversationSlice";
// import { endpoints } from "../../api/config";

// const BASE_URL = "http://202.47.59.77:8080";

// // Custom hook for streaming chat (RTK Query doesn't support streaming)
// const useChatStream = () => {
//   const abortControllerRef = useRef(null);

//   const streamChat = async ({
//     endpoint,
//     data,
//     onStream,
//     onComplete,
//     onError,
//   }) => {
//     try {
//       abortControllerRef.current = new AbortController();

//       const response = await fetch(`${BASE_URL}${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//         signal: abortControllerRef.current.signal,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let accumulatedContent = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value, { stream: true });
//         const lines = chunk.split("\n");

//         for (const line of lines) {
//           if (line.startsWith("data: ")) {
//             try {
//               const jsonData = JSON.parse(line.slice(6));

//               if (jsonData.content) {
//                 accumulatedContent += jsonData.content;
//                 onStream?.(accumulatedContent);
//               }

//               if (jsonData.stop) {
//                 onComplete?.(accumulatedContent);
//                 return accumulatedContent;
//               }
//             } catch (e) {
//               console.error("Parse error:", e);
//             }
//           }
//         }
//       }

//       onComplete?.(accumulatedContent);
//       return accumulatedContent;
//     } catch (error) {
//       if (error.name !== "AbortError") {
//         onError?.(error);
//       }
//       throw error;
//     }
//   };

//   const abort = () => {
//     abortControllerRef.current?.abort();
//   };

//   return { streamChat, abort };
// };

// function ChatArea() {
//   const dispatch = useDispatch();
//   const { conversations, activeConvId } = useSelector(
//     (state) => state.conversation
//   );
//   const activeConv = conversations.find((c) => c.id === activeConvId);

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [showAttachMenu, setShowAttachMenu] = useState(false);

//   const messagesEndRef = useRef(null);
//   const attachMenuRef = useRef(null);

//   const { streamChat, abort } = useChatStream();

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeConv?.messages]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         attachMenuRef.current &&
//         !attachMenuRef.current.contains(event.target)
//       ) {
//         setShowAttachMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     dispatch(addMessage({ convId: activeConvId, message: userMessage }));

//     const userInput = input;
//     setInput("");
//     setIsTyping(true);

//     // Create empty assistant message
//     const assistantMessage = { role: "assistant", content: "" };
//     dispatch(addMessage({ convId: activeConvId, message: assistantMessage }));

//     try {
//       await streamChat({
//         endpoint: endpoints.chat.chatbot,
//         data: {
//           query: userInput,
//         },
//         onStream: (content) => {
//           dispatch(updateLastMessage({ convId: activeConvId, content }));

//           if (conv && conv.messages.length > 0) {
//             const updatedMessages = [...conv.messages];
//             updatedMessages[updatedMessages.length - 1] = {
//               role: "assistant",
//               content: content,
//             };

//             dispatch(
//               updateConversation({
//                 convId: activeConvId,
//                 updates: { messages: updatedMessages },
//               })
//             );
//           }
//         },
//         onComplete: (finalContent) => {
//           console.log("Stream completed:", finalContent);
//         },
//         onError: (error) => {
//           console.error("Stream error:", error);

//           const conv = conversations.find((c) => c.id === activeConvId);
//           if (conv && conv.messages.length > 0) {
//             const updatedMessages = [...conv.messages];
//             updatedMessages[updatedMessages.length - 1] = {
//               role: "assistant",
//               content: "Sorry, I encountered an error. Please try again.",
//             };

//             dispatch(
//               updateConversation({
//                 convId: activeConvId,
//                 updates: { messages: updatedMessages },
//               })
//             );
//           }
//         },
//       });
//     } catch (error) {
//       if (error.name !== "AbortError") {
//         console.error("Error:", error);
//       }
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleStop = () => {
//     abort();
//     setIsTyping(false);
//   };

//   return (
//     <div className="d-flex flex-column h-100">
//       {/* Messages Area */}
//       <div
//         className="flex-grow-1 overflow-auto"
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
//                   color: "#202020",
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
//                 className={`mb-3 mb-md-4 d-flex ${
//                   msg.role === "user"
//                     ? "justify-content-end"
//                     : "justify-content-start"
//                 }`}
//               >
//                 <div
//                   className={`p-3 rounded-3 ${
//                     msg.role === "user" ? "bg-primary text-white" : "bg-#f2f2f2"
//                   }`}
//                   style={{
//                     maxWidth: "85%",
//                     fontSize: "clamp(14px, 2vw, 15px)",
//                     lineHeight: "1.6",
//                   }}
//                 >
//                   {msg.content ||
//                     (isTyping && idx === activeConv.messages.length - 1 ? (
//                       <div className="loader" aria-label="Loading...">
//                         <div className="dot"></div>
//                         <div className="dot"></div>
//                         <div className="dot"></div>
//                       </div>
//                     ) : (
//                       ""
//                     ))}
//                 </div>
//               </div>
//             ))}
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
//           position: "sticky",
//           bottom: 0,
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
//             <div className="position-relative" ref={attachMenuRef}>
//               <button
//                 className="btn btn-sm p-1"
//                 style={{ border: "none", backgroundColor: "transparent" }}
//                 onClick={() => setShowAttachMenu(!showAttachMenu)}
//               >
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <line x1="12" y1="5" x2="12" y2="19"></line>
//                   <line x1="5" y1="12" x2="19" y2="12"></line>
//                 </svg>
//               </button>

//               {showAttachMenu && (
//                 <div
//                   className="position-absolute bg-white rounded-3 shadow-lg p-2"
//                   style={{
//                     bottom: "45px",
//                     left: "0",
//                     minWidth: "220px",
//                     zIndex: 1000,
//                     border: "1px solid #e5e5e5",
//                   }}
//                 >
//                   <div
//                     className="d-flex align-items-center p-2"
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                     }}
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       className="me-2"
//                     >
//                       <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
//                     </svg>
//                     <span>Add photos & files</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <input
//               type="text"
//               className="form-control border-0"
//               placeholder="Ask anything"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSend()}
//               disabled={isTyping}
//               style={{
//                 backgroundColor: "transparent",
//                 boxShadow: "none",
//                 fontSize: "clamp(14px, 2vw, 15px)",
//                 padding: "8px 8px",
//               }}
//             />

//             {isTyping ? (
//               <button
//                 className="btn btn-sm rounded-circle"
//                 onClick={handleStop}
//                 style={{
//                   width: "32px",
//                   height: "32px",
//                   backgroundColor: "#ff4444",
//                   color: "white",
//                   border: "none",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   padding: 0,
//                   flexShrink: 0,
//                 }}
//               >
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <rect x="6" y="6" width="12" height="12"></rect>
//                 </svg>
//               </button>
//             ) : (
//               <button
//                 className="btn btn-sm rounded-circle"
//                 onClick={handleSend}
//                 disabled={!input.trim()}
//                 style={{
//                   width: "32px",
//                   height: "32px",
//                   backgroundColor: input.trim() ? "#000" : "#e5e5e5",
//                   color: "white",
//                   border: "none",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   padding: 0,
//                   flexShrink: 0,
//                 }}
//               >
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatArea;

// import React, { useState, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addMessage, updateLastMessage } from "../../api/conversationSlice";
// import { endpoints } from "../../api/config";

// const BASE_URL = "http://202.47.59.77:8080";

// const useChatStream = () => {
//   const abortControllerRef = useRef(null);
//   const [loading, setLoading] = useState(false);

//   const streamChat = async ({ endpoint, data, onStream, onError }) => {
//     setLoading(true);
//     abortControllerRef.current = new AbortController();
//     try {
//       const response = await fetch(`${BASE_URL}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//         signal: abortControllerRef.current.signal,
//       });

//       if (!response.ok) throw new Error("Server response error");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let accumulated = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         const lines = decoder.decode(value).split("\n");
//         for (const line of lines) {
//           if (line.startsWith("data: ")) {
//             const json = JSON.parse(line.slice(6));
//             if (json.content) {
//               accumulated += json.content;
//               onStream(accumulated);
//             }
//           }
//         }
//       }
//     } catch (e) {
//       if (e.name !== "AbortError") onError?.(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     streamChat,
//     abort: () => abortControllerRef.current?.abort(),
//     loading,
//   };
// };

// function ChatArea() {
//   const dispatch = useDispatch();
//   const inputRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const { conversations, activeConvId } = useSelector(
//     (state) => state.conversation
//   );
//   const activeConv = conversations?.find((c) => c.id === activeConvId);
//   const { streamChat, abort, loading } = useChatStream();

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeConv?.messages, loading]);

//   const handleSend = async () => {
//     const val = inputRef.current.value.trim();
//     if (!val || loading) return;
//     inputRef.current.value = "";

//     dispatch(
//       addMessage({
//         convId: activeConvId,
//         message: { role: "user", content: val },
//       })
//     );
//     dispatch(
//       addMessage({
//         convId: activeConvId,
//         message: { role: "assistant", content: "" },
//       })
//     );

//     await streamChat({
//       endpoint: endpoints.chat.chatbot,
//       data: { query: val },
//       onStream: (content) =>
//         dispatch(updateLastMessage({ convId: activeConvId, content })),
//       onError: (err) =>
//         dispatch(
//           updateLastMessage({ convId: activeConvId, content: `Error: ${err}` })
//         ),
//     });
//   };

//   return (
//     <div
//       className="d-flex flex-column"
//       style={{ height: "100vh", overflow: "hidden" }}
//     >
//       <div className="flex-grow-1 overflow-auto p-3 p-md-4 ">
//         <div className="mx-auto">
//           {activeConv?.messages.map((msg, idx) => {
//             const isLast = idx === activeConv.messages.length - 1;
//             return (
//               <div
//                 key={idx}
//                 className={`mb-4 d-flex ${
//                   msg.role === "user"
//                     ? "justify-content-end"
//                     : "justify-content-start"
//                 }`}
//               >
//                 <div
//                   className={`p-3 rounded-3 ${
//                     msg.role === "user"
//                       ? "bg-primary text-white"
//                       : "bg-light border"
//                   }`}
//                   style={{ maxWidth: "85%", fontSize: "15px" }}
//                 >
//                   {msg.content ||
//                     (loading && isLast ? (
//                       <div className="loader">
//                         <div className="dot"></div>
//                         <div className="dot"></div>
//                         <div className="dot"></div>
//                       </div>
//                     ) : (
//                       ""
//                     ))}
//                 </div>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       <div className="p-3 bg-white overflow-hidden overflow-y-auto sticky-bottom">
//         <div
//           className="d-flex align-items-center gap-2 mx-auto"
//           style={{ maxWidth: "800px" }}
//         >
//           <div className="position-relative flex-grow-1">
//             <input
//               ref={inputRef}
//               className="form-control rounded-pill border-1 bg-light px-4 shadow-none"
//               placeholder="Ask anything"
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               style={{ height: "50px" }}
//             />
//           </div>
//           <button
//             className="btn rounded-circle d-flex align-items-center justify-content-center text-white border-0"
//             style={{
//               width: "50px",
//               height: "50px",
//               backgroundColor: loading ? "#dc3545" : "#000",
//             }}
//             onClick={loading ? abort : handleSend}
//           >
//             {loading ? (
//               "■"
//             ) : (
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatArea;
