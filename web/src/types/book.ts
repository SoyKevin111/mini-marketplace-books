export interface Book {
	id: string,
	title: string,
	author: string,
	genre: string,
	publishedAt: string,
	imageUrl: string,
	fav: boolean
}

export interface Pageable<T> {
	content: T[],
	totalElements: number,
	totalPages: number,
	page: number
}