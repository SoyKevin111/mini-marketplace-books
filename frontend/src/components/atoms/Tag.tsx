import React from 'react';

const colors = [
	'#FF6B6B', // rojo fuerte
	'#4ECDC4', // turquesa brillante
	'#FFD93D', // amarillo intenso
	'#1A8FE3', // azul vivo
	'#FF7F50', // coral encendido
];

interface Props {
	label: string;
}

const Tag = ({ label }: Props) => {
	const color = colors[Math.floor(Math.random() * colors.length)];

	return (
		<span
			className="px-3 pb-[3px] rounded-full text-sm font-medium border"
			style={{
				backgroundColor: color,
				border: 'none',
				color: '#fff',
			}}
		>
			{label}
		</span>
	);
};

export default Tag;
