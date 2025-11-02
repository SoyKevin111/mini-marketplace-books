import { Book, Pageable } from "@/types/book";
import axios from "axios";

const API_URL = "http://localhost:8080/books";

export const bookService = {
	async fetch(page: number, pageSize: number): Promise<Pageable<Book>> {
		const res = await axios.get<any>(`${API_URL}?size=${pageSize}&page=${page}`);
		console.log(res.data)
		const pageable = {
			content: res.data.content.map((b: any) => ({
				...b,
				id: String(b.id),
			})),
			totalElements: res.data.totalElements,
			totalPages: res.data.totalPages,
			page: res.data.pageable.pageNumber,
		};
		return pageable;
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
		return res.data;
	},
	async findAllGenres(): Promise<any> {
		return axios.get<any>(API_URL + '/genres').then(res => {
			console.log(res.data)
			return res.data
		});
	},
	async findAllAuthors(): Promise<any> {
		return axios.get<any>(API_URL + '/authors').then(res => {
			console.log(res.data)
			return res.data
		});
	},
	async findFilterBooks(genre: string, author: string, page: number, size: number): Promise<Pageable<Book>> {
		console.log('fetch filter	')
		console.log(author + " " + genre)
		return axios.get<any>(`${API_URL}/filter`, {
			params: { genre, author, page, size }
		}).then(res => {
			console.log(res.data);
			return res.data;
		});
	}

};
