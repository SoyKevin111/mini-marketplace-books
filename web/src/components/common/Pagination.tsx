import React from 'react';
import { useRouter } from 'next/router';

interface Props {
	total: number;
	page: number;
	pageSize: number;
	setPage?: (page: number) => void;
	setPageFilter?: (page: number) => void;
	pathname?: string;
}

const Pagination = ({ total, page, setPage, setPageFilter, pathname }: Props) => {
	const router = useRouter();

	const goToPage = (newPage: number) => {
		/* 		if (setPageFilter) {
					setPageFilter(newPage);
					console.log('set filter: ' + newPage);
				} else if (setPage) {
					setPage(newPage);
					console.log('set page: ' + newPage);
				} */
		console.log('nextPage: ' + newPage);
		if (pathname) {
			router.push(
				{
					pathname,
					query: { page: newPage },
				},
				undefined,
				{ shallow: true }
			);
		}
	};

	return (
		<div className="flex gap-2 justify-center my-4">
			{Array.from({ length: total }, (_, i) => {
				if (page === i) console.log(`pagination: ${page} - ${i}`);
				return (
					<button
						key={i}
						onClick={() => goToPage(i)}
						className={`cursor-pointer px-3 py-1 rounded transition-colors duration-200 
            ${page === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}
          `}
					>
						{i + 1}
					</button>
				);
			})}
		</div>
	);
};

export default Pagination;
