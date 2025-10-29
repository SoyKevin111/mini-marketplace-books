import { useBookStore } from '@/store/BookStore';
import { HeartIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ItemPage = () => {
	const { id } = useRouter().query;
	const bookId = id as string;

	const { updateBook, getBookSelected, bookSelected, setBookSelected, loading } = useBookStore();

	useEffect(() => {
		getBookSelected(bookId);
	}, [id]);

	const toggleFavorite = () => {
		if (!bookSelected) return;
		const updated = { ...bookSelected, fav: !bookSelected.fav };
		setBookSelected(updated);
		updateBook(updated.id, updated);
	};

	if (loading) return <p className="p-5">Cargando libro...</p>;
	if (!bookSelected) return <p className="p-5 text-red-500">Libro no encontrado</p>;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-amber-50 rounded-lg shadow-md flex flex-col md:flex-row gap-6 relative">
			<div
				onClick={toggleFavorite}
				className="absolute top-[3%] right-[2%] cursor-pointer flex flex-col justify-center items-center select-none"
			>
				<HeartIcon className={`w-[45px] h-[45px] ${bookSelected.fav ? 'text-red-500' : 'text-gray-300'}`} />
				<span className="font-bold">favorito</span>
			</div>

			<img
				src={bookSelected.imageUrl}
				alt={bookSelected.title}
				className="w-full md:w-64 h-auto object-cover rounded-md shadow-sm"
			/>

			<div className="flex flex-col mt-2">
				<h2 className="text-2xl font-bold text-gray-800 mb-2">{bookSelected.title}</h2>
				<p className="text-sm text-gray-600">
					por <span className="font-medium">{bookSelected.author}</span> — publicado el <span className="italic">{bookSelected.publishedAt}</span>
				</p>
				<p className='my-3 text-gray-600'>Género: {bookSelected.genre}</p>
				<p className="text-gray-700 leading-relaxed">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt
					fermentum, nunc sapien tincidunt nulla, nec ultricies justo sapien nec lorem. Integer
					vehicula, justo at facilisis tincidunt, sapien sapien tincidunt sapien, ut tincidunt sapien
					sapien nec sapien.
				</p>
			</div>
		</div>
	);
};

export default ItemPage;
