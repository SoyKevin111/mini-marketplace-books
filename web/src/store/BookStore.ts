import { Book } from "@/types/book";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { bookService } from "../service/BookService";
import { Filter } from "@/types/filter";

interface BookState {
	books: Book[];
	cache: Record<number, Book[]>;
	page: number;
	pageSize: number;
	totalPages: number;

	booksFilter: Book[];
	cacheFilter: Record<number, Book[]>;
	filterPage: number;
	filterPageSize: number;
	filterTotalPages: number;

	genres: string[];
	authors: string[];
	bookSelected: Book | null;
	filter: Filter;

	loading: boolean;
	errorMessage: string | null;

	fetchBooks: (page: number) => Promise<void>;
	fetchGenres: () => Promise<void>;
	fetchAuthors: () => Promise<void>;
	createBook: (book: Book) => Promise<void>;
	updateBook: (id: string, book: Book) => Promise<void>;
	deleteBook: (id: string) => Promise<void>;
	setPage: (page: number) => void;
	getBookSelected: (id: string) => void;
	setBookSelected: (book: Book) => void;
	setFilter: (filter: Filter) => void;
	filterBooks: (page: number, genre: string, author: string) => Promise<void>;
	setPageFilter: (page: number) => void;
	clearFilter: () => void;
}

export const useBookStore = create<BookState>()(
	persist(
		(set, get) => ({
			books: [],
			cache: {},
			page: 0,
			pageSize: 12,
			totalPages: 0,

			booksFilter: [],
			cacheFilter: {},
			filterPage: 0,
			filterPageSize: 12,
			filterTotalPages: 0,

			genres: [],
			authors: [],
			bookSelected: null,
			filter: { author: "", genre: "" },

			loading: false,
			errorMessage: null,

			fetchBooks: async (page) => {
				set({ loading: true, errorMessage: null });
				try {
					const response = await bookService.fetch(page, get().pageSize);
					set((state) => ({
						cache: { ...state.cache, [page]: response.content },
						books: response.content,
						totalPages: response.totalPages,
						page,
					}));
				} catch (error: any) {
					console.error("fetchBooks error:", error);
					set({ errorMessage: error.message || "Error al obtener libros" });
				} finally {
					set({ loading: false });
				}
			},

			createBook: async (book) => {
				set({ errorMessage: null });
				try {
					const newBook = await bookService.create(book);
					set({ books: [...get().books, newBook] });
				} catch (error: any) {
					console.error("createBook error:", error);
					set({ errorMessage: error.message || "Error al crear libro" });
				}
			},

			updateBook: async (id, book) => {
				set({ errorMessage: null });
				try {
					const updatedBook = await bookService.update(id, book);
					set({
						books: get().books.map((b) =>
							b.id === book.id ? updatedBook : b
						),
					});
				} catch (error: any) {
					console.error("updateBook error:", error);
					set({ errorMessage: error.message || "Error al actualizar libro" });
				}
			},

			deleteBook: async (id) => {
				set({ errorMessage: null });
				try {
					await bookService.delete(id);
					set({ books: get().books.filter((b) => b.id !== id) });
				} catch (error: any) {
					console.error("deleteBook error:", error);
					set({ errorMessage: error.message || "Error al eliminar libro" });
				}
			},
			getBookSelected: async (id) => {
				set({ loading: true, errorMessage: null });
				if (get().bookSelected?.id === id) {
					set({ loading: false });
					return;
				}
				try {
					const book = await bookService.findById(id);
					set({ bookSelected: book });
				} catch (error: any) {
					console.error("findBook error:", error);
					set({
						errorMessage:
							error.message || "Error al cargar el libro seleccionado.",
					});
				} finally {
					set({ loading: false });
				}
			},

			setBookSelected: (book) => {
				set({ bookSelected: book });
			},

			fetchGenres: async () => {
				set({ loading: true, errorMessage: null });
				try {
					const genres = await bookService.findAllGenres();
					set({ genres });
				} catch (error: any) {
					console.error("findGenres error:", error);
					set({ errorMessage: error.message || "Error al cargar los géneros." });
				} finally {
					set({ loading: false });
				}
			},
			fetchAuthors: async () => {
				set({ loading: true, errorMessage: null });
				try {
					const authors = await bookService.findAllAuthors();
					set({ authors });
				} catch (error: any) {
					console.error("findAuthors error:", error);
					set({ errorMessage: error.message || "Error al cargar los autores." });
				} finally {
					set({ loading: false });
				}
			},

			filterBooks: async (page, genre, author) => {
				set({ loading: true, errorMessage: null });
				try {
					const response = await bookService.findFilterBooks(
						genre,
						author,
						page,
						get().filterPageSize
					);
					if (!response.content.length) {
						set({ loading: false, errorMessage: "No se encontraron resultados con los filtros proporcionados." });
						return;
					}
					set((state) => ({
						cacheFilter: { ...state.cacheFilter, [page]: response.content },
						booksFilter: response.content,
						filterTotalPages: response.totalPages,
						filterPage: page,
					}));
				} catch (error: any) {
					console.error("filterBooks error:", error);

					const backendMessage =
						error.response?.data?.message ||
						error.response?.data?.error ||
						error.message ||
						"Error al filtrar libros";

					set({ errorMessage: backendMessage });
				} finally {
					set({ loading: false });
				}
			},

			setFilter: (filter: Filter) => {
				set({ filter });
			},

			setPageFilter: (page: number) => {
				const cachedBooks = get().cacheFilter[page];
				set({
					filterPage: page,
					booksFilter: cachedBooks || []
				})
			},
			setPage: (page) => {
				const cachedBooks = get().cache[page];
				set({
					page,
					books: cachedBooks || [],
				});
			},
			clearFilter: () => set({ filter: { author: "", genre: "" }, booksFilter: [], filterPage: 0 }),
		}),

		{
			name: "book-store",
			partialize: (state) => ({
				filter: state.filter,
			}),
		}
	)
);
