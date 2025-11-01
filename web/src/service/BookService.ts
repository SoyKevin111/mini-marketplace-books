import { Book, Pageable } from "@/types/book";
import axios from "axios";

const API_URL = "http://localhost:8080/books";

export const bookService = {
	async fetch(page: number, pageSize: number): Promise<Pageable<Book>> {
		console.log(`page: ${page}   -   size: ${pageSize}`)
		const res = await axios.get<any>(`${API_URL}?size=${pageSize}&page=${page}`);
		const pageable = {
			content: res.data.content.map((b: any) => ({
				...b,
				id: String(b.id),
			})),
			totalElements: res.data.totalElements,
			totalPages: res.data.totalPages,
			page: res.data.pageable.pageNumber,
		};
		console.log('fetch');
		console.log(res.data)
		console.log(pageable)
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
		console.log('fetch by id')
		return res.data;
	},
	async findAllGenres(): Promise<any> {
		return axios.get<any>(API_URL + '/genres').then(res => {
			console.log(res.data)
			return res.data
		});
	}

};
