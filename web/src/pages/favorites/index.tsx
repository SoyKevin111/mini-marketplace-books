import FilterTemplate from '@/components/template/FilterTemplate'
import React from 'react'

const Page = () => {
	return (
		<>
			<FilterTemplate filterFavorite={true} pathname='/favorites' />
		</>
	)
}

export default Page