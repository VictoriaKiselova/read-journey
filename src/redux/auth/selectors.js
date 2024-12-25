export const selectName = state => state.auth.name;
export const selectIsAuthorized = state => state.auth.isAuthorized;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoading = state => state.auth.loading;
export const selectIsError = state => state.auth.error;
