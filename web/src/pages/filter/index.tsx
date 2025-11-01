import Selector from '@/components/atoms/Selector'
import { useBookStore } from '@/store/BookStore'
import React, { useEffect } from 'react'

const Page = () => {

	const { fetchGenres, genres } = useBookStore();

	useEffect(() => {
		fetchGenres()
	}, [])

	return (
		<div>
			<div className='flex justify-between'>
				<div className='flex gap-3'>
					<Selector label='Género' options={genres}></Selector>
					<Selector label='Autor' options={genres}></Selector>
				</div>
				<div className='flex justify-center items-center'>
					<p className='bg-pink-600 text-gray-900 font-bold px-10 py-1 cursor-pointer'>Filtrar</p>
				</div>
			</div>
		</div>
	)
}

export default Page