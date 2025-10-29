import { StyledIcon } from '@/types/icon';
import Link from 'next/link';
import Icon from '../atoms/Icon';

interface Props {
	icon: StyledIcon;
	path: string;
	label: string;
}

const ItemSidebar = ({ icon, path, label }: Props) => {

	return (
		<Link href={'/' + path} className='w-full h-auto flex gap-3 hover:bg-gray-400 py-3 ps-6'  >
			<Icon icon={icon} ></Icon>
			<span className='text-[1.1rem]'>{label}</span>
		</Link>
	)
}

export default ItemSidebar