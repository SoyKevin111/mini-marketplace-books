import Pagination from '@/components/common/Pagination';
import ListCardBook from '@/components/organisms/ListCardBook';
import { useBookStore } from '@/store/BookStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page = () => {
	const { books, fetchBooks, loading, errorMessage, setPage, page, pageSize, total, cache } = useBookStore();
	const router = useRouter();
	const queryPage = parseInt(router.query.page as string) || 1;

	useEffect(() => { //inicio del componente y al cambiar de pagina		
		setPage(queryPage);

		if (!cache[queryPage]) {
			fetchBooks(queryPage);
		}
	}, [queryPage]);

	if (loading) return <p className="p-5">Cargando libros...</p>;
	if (errorMessage) return <p className="p-5 text-red-500">{errorMessage}</p>;

	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-col flex-grow justify-between">
				<ListCardBook books={books} />
				<div>
					<Pagination page={page} setPage={setPage} pageSize={pageSize} total={total} />
				</div>
			</div>
		</div>
	);
};

export default Page;
