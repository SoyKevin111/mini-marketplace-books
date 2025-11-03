import Selector from '@/components/atoms/Selector';
import Pagination from '@/components/common/Pagination';
import ListCardBook from '@/components/organisms/ListCardBook';
import { useBookStore } from '@/store/BookStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface FilterTemplateProps {
	filterFavorite?: boolean;
	pathname: string;
}

const FilterTemplate = ({ filterFavorite = false, pathname }: FilterTemplateProps) => {

	const { fetchGenres, genres, fetchAuthors, authors, setPageFilter, filterPage, filterPageSize, filterTotalPages, cacheFilter, filterBooks, filter, booksFilter, loading, errorMessage, clearFilter, setFilter } = useBookStore();
	const router = useRouter();
	const queryPage = router.query.page ? parseInt(router.query.page as string) : null;
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (!router.isReady || initialized) return;

		fetchGenres();
		fetchAuthors();

		if (router.pathname === '/favorites' && !filter.favorites) {
			console.log("filtro + favoritos");
			clearFilter();
			localStorage.clear();
			setFilter({ genre: '', author: '', favorites: true });
			console.log('esfav(1): ', filter.favorites)
		}

		if (router.pathname === '/filter' && filter.favorites) {
			console.log("filtro");
			clearFilter();
			localStorage.clear();
			setFilter({ genre: '', author: '', favorites: false });
			console.log('esfav(2): ', filter.favorites)
		}
		setInitialized(true);
	}, [router.isReady, queryPage]);

	useEffect(() => {
		if (!router.isReady) return;

		if (queryPage !== null && queryPage >= 0) {
			setPageFilter(queryPage);
			const hasFilters = filter.genre?.trim() || filter.author?.trim();
			if (!cacheFilter[queryPage] && hasFilters) {
				filterBooks(queryPage ?? 0, filter);
			}
		}
	}, [queryPage, router.isReady, filter]);

	const clearFilters = () => {
		localStorage.clear();
		clearFilter();
		if (router.pathname === '/filter') setFilter({ genre: '', author: '', favorites: false });
		if (router.pathname === '/favorites') setFilter({ genre: '', author: '', favorites: true });
		router.replace(pathname, undefined, { shallow: true });
	}

	const handleFilterClick = () => {
		const noFilters = !filter.genre?.trim() && !filter.author?.trim();
		if (noFilters) {
			alert('Debe proporcionar al menos un filtro (género o autor)');
			return;
		}
		filterBooks(queryPage ?? 0, filter);
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
						onClick={clearFilters}
						className='bg-gray-200 px-10 py-1 cursor-pointer'>
						Limpiar
					</div>
					<div
						onClick={handleFilterClick}
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
				{booksFilter.length > 0 && (
					<div>
						<Pagination
							page={filterPage}
							setPage={setPageFilter}
							pageSize={filterPageSize}
							total={filterTotalPages}
							pathname={pathname}
							favorites={filterFavorite}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default FilterTemplate;