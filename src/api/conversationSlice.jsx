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
        conv.messages.push({
          role: message.role,
          content: message.content || "",
          references: message.references || [],
        });
      }
    },

    updateLastMessage: (state, action) => {
      const { convId, content, references } = action.payload;
      const conv = state.conversations.find((c) => c.id === convId);

      if (conv && conv.messages.length > 0) {
        const lastMsg = conv.messages[conv.messages.length - 1];
        if (content !== undefined) lastMsg.content = content;
        if (references) lastMsg.references = references;
      }
    },
  },
});

export const { createNewChat, selectChat, addMessage, updateLastMessage } =
  conversationSlice.actions;

export default conversationSlice.reducer;
