export const selectOwnBooks = state => state.filters.ownBooks;
export const selectIsSuccessAddToLibrary = state =>
  state.filters.isSuccessAddToLibrary;
export const selectIsLoading = state => state.filters.loading;
export const selectIsError = state => state.filters.error;