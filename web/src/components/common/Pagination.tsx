import React from 'react';
import { useRouter } from 'next/router';

interface Props {
	total: number;
	page: number;
	pageSize: number;
	setPage?: (page: number) => void;
	setPageFilter?: (page: number) => void;
	pathname?: string;
	favorites?: boolean;
}

const Pagination = ({ total, page, pathname }: Props) => {
	const router = useRouter();

	const goToPage = (newPage: number) => {
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
				return (
					<button
						key={i}
						onClick={() => goToPage(i)}
						className={`cursor-pointer px-3 py-1 rounded transition-colors duration-200 
            ${page === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}
          `}
					>
						{i}
					</button>
				);
			})}
		</div>
	);
};

export default Pagination;
