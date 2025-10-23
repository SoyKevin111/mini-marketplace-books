export interface Book {
	id: string,
	title: string,
	author: string,
	genre: string,
	publishedAt: string,
	imageUrl: string,
	fav: boolean
}

export interface PaginatedBook {
	data: Book[],
	total: number,
	page: number,
	pageSize: number
}