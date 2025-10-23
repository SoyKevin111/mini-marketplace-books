import { StyledIcon } from '@/types/icon';
import { cloneElement } from 'react';

interface Props {
	icon: StyledIcon;
	style?: string;
}

const Icon = ({ icon, style }: Props) => {
	const defaultStyle: string = 'w-6 h-6';
	const styledIcon = cloneElement(icon, {
		className: style ? style : defaultStyle
	})
	return (
		<>{styledIcon}</>
	)
}

export default Icon