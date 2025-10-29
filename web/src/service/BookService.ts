import { Book, PaginatedBook } from "@/types/book";
import axios from "axios";

const API_URL = "http://localhost:3005/books";

export const bookService = {
	async fetch(page: number, pageSize: number): Promise<PaginatedBook> {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const res = await axios.get<Book[]>(`${API_URL}?_start=${start}&_end=${end}`);
		console.log('fetch')
		return {
			data: res.data,
			total: 29,
			page,
			pageSize,
		};
	},

	async create(book: Book): Promise<Book> {
		return axios.post<Book>(API_URL, book).then(res => res.data);
	},

	async update(id: string, book: Partial<Book>): Promise<Book> {
		return axios.put<Book>(`${API_URL}/${id}`, book).then(res => res.data);
	},

	async delete(id: string): Promise<void> {
		return axios.delete(`${API_URL}/${id}`).then(() => { });
	},
	async findById(id: string): Promise<Book> {
		const res = await axios.get<Book>(`${API_URL}/${id}`);
		console.log('fetch by id')
		return res.data;
	}

};
