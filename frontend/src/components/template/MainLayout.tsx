
import Sidebar from '../organisms/Sidebar';

interface Props {
	component: any;
}

const MainLayout = ({ component }: Props) => {
	return (
		<div className='flex'>
			<aside className='w-[280px] h-screen bg-gray-300'>
				<Sidebar />
			</aside>
			<main className='flex-1 h-screen'>
				<div className='w-full h-full overflow-y-scroll py-4 px-5'>
					{component}
				</div>
			</main>
		</div>
	)
}

export default MainLayout	