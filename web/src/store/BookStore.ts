import { Book } from "@/types/book";
import { create } from "zustand";
import { bookService } from "../service/BookService";

interface BookState {
	books: Book[];
	cache: Record<number, Book[]>;
	bookSelected: Book | null;
	total: number;
	page: number;
	pageSize: number;
	loading: boolean;
	errorMessage: string | null;
	fetchBooks: (page: number) => Promise<void>;
	createBook: (book: Book) => Promise<void>;
	updateBook: (id: string, book: Book) => Promise<void>;
	deleteBook: (id: string) => Promise<void>;
	setPage: (page: number) => void;
	getBookSelected: (id: string) => void;
	setBookSelected: (book: Book) => void;
}

export const useBookStore = create<BookState>((set, get) => ({
	books: [],
	cache: {},
	bookSelected: null,
	total: 0,
	page: 1,
	pageSize: 12,
	loading: false,
	errorMessage: null,

	fetchBooks: async (page) => {
		set({ loading: true, errorMessage: null });
		try {
			const response = await bookService.fetch(page, get().pageSize);
			set((state) => ({
				cache: { ...state.cache, [page]: response.content },
				books: response.content,
				total: response.totalPages,
				page: response.page,
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
				books: get().books.map((b) => (b.id === book.id ? updatedBook : b)),
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
	setPage: (page) => {
		const cachedBooks = get().cache[page];
		set({
			page,
			books: cachedBooks || [], //si es que hay cache
		});
	},
	//valida si existe en el store y devuelve, si no consulta al server y devuelve.
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
			set({ errorMessage: error.message || "Error al cargar el libro seleccionado." });
		} finally {
			set({ loading: false });
		}
	},

	setBookSelected: (book) => {
		set({
			bookSelected: book
		})
	}
}));
