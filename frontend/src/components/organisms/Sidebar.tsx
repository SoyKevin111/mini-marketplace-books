
import { BookmarkIcon, BookOpenIcon, FunnelIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ItemSidebar from '../molecules/ItemSidebar'

const Sidebar = () => {
	return (
		<>
			<div className='nav-h flex gap-4 py-7 px-6'>
				<div className="nav-h-icon">
					<div className='rounded-full w-13 h-13 bg-cyan-400 flex flex-col items-center justify-center'>
						<p className='text-white text-2xl font-bold'>K</p>
					</div>
				</div>
				<div className="nav-h_content">
					<p>Kevin Steven</p>
					<p>Lector Legendario</p>
				</div>
			</div>
			<nav className='w-full flex flex-col gap-2 py-7'>
				<ItemSidebar icon={<HomeIcon />} path='home' label='Inicio' />
				<ItemSidebar icon={<BookOpenIcon />} path='books' label='Libros' />
				<ItemSidebar icon={<FunnelIcon />} path='filter' label='Filtrar' />
				<ItemSidebar icon={<BookmarkIcon />} path='favorites' label='Favoritos' />
				<ItemSidebar icon={<MagnifyingGlassIcon />} path='search' label='Buscar Libros' />
			</nav>
		</>
	)
}

export default Sidebar