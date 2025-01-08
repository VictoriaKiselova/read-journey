export const selectIsBooksRecommend = state =>
  state.books.recommend.booksRecommend;
export const selectIsModal = state => state.books.isModal;
export const selectSelectedBook = state => state.books.selectedBook;
export const selectIsFilteredBooks = state => state.books.filteredBooks;
export const selectIsPage = state => state.books.page;
export const selectAllBooks = state => state.books.allBooks;
export const selectIsLoading = state => state.books.loading;
export const selectIsError = state => state.books.error;
export const selectMobMenu = state => state.books.mobMenu;
