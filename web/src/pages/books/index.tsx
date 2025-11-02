import Pagination from '@/components/common/Pagination';
import ListCardBook from '@/components/organisms/ListCardBook';
import { useBookStore } from '@/store/BookStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page = () => {
	const router = useRouter();
	const queryPage = parseInt(router.query.page as string) || 0;
	const { books, fetchBooks, loading, errorMessage, setPage, page, pageSize, totalPages, cache } = useBookStore();

	useEffect(() => { //inicio del componente y al cambiar de pagina		
		if (!router.isReady) return;
		if (queryPage >= 0) {
			/* 			fetchBooks(0);
						return; */
			setPage(queryPage);
			if (!cache[queryPage]) {
				fetchBooks(queryPage);
			}
		}
	}, [queryPage]);

	if (loading) return <p className="p-5">Cargando libros...</p>;
	if (errorMessage) return <p className="p-5 text-red-500">{errorMessage}</p>;

	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-col flex-grow justify-between">
				<ListCardBook books={books} />
				<div>
					<Pagination page={page} setPage={setPage} pageSize={pageSize} total={totalPages} pathname='/books' />
				</div>
			</div>
		</div>
	);
};

export default Page;
