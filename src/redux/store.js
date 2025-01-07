import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth/slice";
import booksSliceReducer from "./books/slice";
import libraryFiltersReducer from "./libraryFilters/slice";
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
  whitelist: ["allBooks"],
};
const pBooksReducer = persistReducer(persistConfigBooks, booksSliceReducer);

const persistConfigLibraryFilters = {
  key: "filters",
  storage,
  whitelist: ["ownBooks"],
};
const pLibraryFiltersReducer = persistReducer(
  persistConfigLibraryFilters,
  libraryFiltersReducer
);

export const store = configureStore({
  reducer: {
    auth: pAuthReducer,
    books: pBooksReducer,
    filters: pLibraryFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
