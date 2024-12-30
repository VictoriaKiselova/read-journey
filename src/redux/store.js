import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth/slice";
import booksSliceReducer from "./books/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};
const pAuthReducer = persistReducer(persistConfigAuth, authSliceReducer);

const persistConfigBooks = {
  key: "books",
  storage,
  whitelist: ["booksRecommend"],
};
const pBooksReducer = persistReducer(persistConfigBooks, booksSliceReducer);

export const store = configureStore({
  reducer: {
    auth: pAuthReducer,
    books: pBooksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
