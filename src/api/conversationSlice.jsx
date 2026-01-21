import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [{ id: 1, title: "New Chat", messages: [] }],
  activeConvId: 1,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    createNewChat: (state) => {
      const newId =
        state.conversations.length > 0
          ? Math.max(...state.conversations.map((c) => c.id)) + 1
          : 1;
      state.conversations.unshift({
        id: newId,
        title: "New Chat",
        messages: [],
      });
      state.activeConvId = newId;
    },
    selectChat: (state, action) => {
      state.activeConvId = action.payload;
    },
    addMessage: (state, action) => {
      const { convId, message } = action.payload;
      const conv = state.conversations.find((c) => c.id === convId);
      if (conv) {
        conv.messages.push(message);
        if (conv.messages.length === 1 && message.role === "user") {
          conv.title =
            message.content.slice(0, 30) +
            (message.content.length > 30 ? "..." : "");
        }
      }
    },
    updateLastMessage: (state, action) => {
      const { convId, content } = action.payload;
      const conv = state.conversations.find((c) => c.id === convId);
      if (conv && conv.messages.length > 0) {
        const lastMsgIndex = conv.messages.length - 1;
        conv.messages[lastMsgIndex].content = content;
      }
    },
    updateConversation: (state, action) => {
      const { convId, updates } = action.payload;
      const conv = state.conversations.find((c) => c.id === convId);
      if (conv) {
        Object.assign(conv, updates);
      }
    },
  },
});

export const {
  createNewChat,
  selectChat,
  addMessage,
  updateLastMessage,
  updateConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
