import { Book } from '@/types/book';
import { truncate } from '@/utils/truncate';
import ItemCardBook from '../molecules/ItemCardBook';


interface Props {
	books: Book[],
	createBook?: Function
	deleteBook?: Function
	updateBook?: Function
}

const ListCardBook = ({ books }: Props) => {

	return (

		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
			{books.map((b) => (
				<ItemCardBook
					id={b.id}
					genre={b.genre}
					title={truncate(b.title, 18)}
					img={b.imageUrl?.length ? b.imageUrl : 'https://tse2.mm.bing.net/th/id/OIP.KUwNL_TVKJrUXdjKAfPcxQHaKi?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'}
				/>
			))
			}
		</div>
	)
}

export default ListCardBook