import React from 'react';
import { useRouter } from 'next/router';

interface Props {
	total: number;
	page: number;
	pageSize: number;
	setPage: (page: number) => void;
}

const Pagination = ({ total, page, setPage }: Props) => {
	const router = useRouter();

	const goToPage = (newPage: number) => {
		setPage(newPage);
		router.push(
			{
				pathname: '/books',
				query: { page: newPage },
			},
			undefined,
			{ shallow: true }
		);
	};

	return (
		<div className="flex gap-2 justify-center my-4">
			{Array.from({ length: total }, (_, i) => (
				<button
					key={i}
					onClick={() => goToPage(i + 1)}
					className={`cursor-pointer px-3 py-1 rounded transition-colors duration-200 
            ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}
          `}
				>
					{i + 1}
				</button>
			))}
		</div>
	);
};

export default Pagination;
