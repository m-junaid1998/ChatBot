// import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import themeReducer from "../api/toggleThemeSlice";
// import { apiSlice } from "../api/apiSlice";

// const themePersistConfig = {
//   key: "theme",
//   storage,
// };

// const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

// export const store = configureStore({
//   reducer: {
//     theme: persistedThemeReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }).concat(
//       apiSlice.middleware
//     ),
// });

// export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Reducers import karein
import { authReducer } from "./authSlice";
import themeReducer from "../api/toggleThemeSlice";
import conversationReducer from "../api/conversationSlice"; 
import { apiSlice } from "../api/apiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme", "conversation"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  conversation: conversationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export default store;