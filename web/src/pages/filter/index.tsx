import Selector from '@/components/atoms/Selector';
import Pagination from '@/components/common/Pagination';
import ListCardBook from '@/components/organisms/ListCardBook';
import { useBookStore } from '@/store/BookStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page = () => {

	const { fetchGenres, genres, fetchAuthors, authors, setPageFilter, filterPage, filterPageSize, filterTotalPages, cacheFilter, filterBooks, filter, booksFilter, loading, errorMessage } = useBookStore();
	const router = useRouter();
	const queryPage = router.query.page ? parseInt(router.query.page as string) : null;



	useEffect(() => {
		fetchGenres();
		fetchAuthors();

	}, [])

	useEffect(() => {
		if (!router.isReady) return;
		if (queryPage !== null && queryPage >= 0) {
			setPageFilter(queryPage);
			const hasFilters = filter.genre?.trim() || filter.author?.trim();
			if (!cacheFilter[queryPage] && hasFilters) {
				fetchBooksFilter();
			}
		}

	}, [queryPage, router.isReady])

	const fetchBooksFilter = async () => {
		await filterBooks(queryPage ?? 0, filter.genre, filter.author);
	};



	return (
		<div className='flex flex-col h-full gap-2'>
			<div className='flex justify-between'>
				<div className='flex gap-3'>
					<Selector label='Género' options={genres} ></Selector>
					<Selector label='Autor' options={authors}  ></Selector>
				</div>
				<div className='flex justify-end items-center gap-4'>
					<div
						onClick={() => localStorage.clear()}
						className='bg-gray-200 px-10 py-1 cursor-pointer'>
						Limpiar
					</div>
					<div
						onClick={() => fetchBooksFilter()}
						className='bg-pink-600 text-gray-900 font-bold px-10 py-1 cursor-pointer'>
						Filtrar
					</div>
				</div>
			</div>
			<div className="flex flex-col flex-grow justify-between">
				{loading && <p className="p-5">Cargando libros...</p>}
				{errorMessage && !loading && (
					<p className="p-5 text-red-500">{errorMessage}</p>
				)}
				{!loading && !errorMessage && <ListCardBook books={booksFilter} />}
				<div>
					<Pagination page={filterPage} setPage={setPageFilter} pageSize={filterPageSize} total={filterTotalPages} pathname='/filter' />
				</div>
			</div>
		</div>
	)
}

export default Page