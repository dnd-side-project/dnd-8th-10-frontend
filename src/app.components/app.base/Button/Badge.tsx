import React from 'react';

interface Props {
	color: 'coolGray' | 'secondary' | 'white' | 'warmGray';
	size: 'large' | 'small';
	children: React.ReactNode;
}
function Badge({ color, size, children }: Props) {
	const getBgColor = () => {
		if (color === 'coolGray') return 'bg-g6';
		if (color === 'secondary') return 'bg-secondary';
		if (color === 'white') return 'bg-w';
		return 'bg-g1';
	};
	const getSize = () => {
		if (size === 'small') return ' py-[0.2rem] px-[0.8rem] rounded-[0.4rem]';
		return ' py-[0.5rem] px-[0.6rem] rounded-[0.8rem]';
	};
	const getBorderStyle = () => {
		return `${color === 'white' ? 'border-solid border-[0.1rem] border-g3' : ''}`;
	};
	const getTextColor = () => {
		if (color === 'white') return 'text-g6';
		if (color === 'warmGray') return 'text-g8';
		return 'text-w';
	};

	return (
		<div
			className={`${getSize()} ${getBgColor()} ${getBorderStyle()} ${getTextColor()} w-fit rounded-[0.8rem] text-subhead1 text-center `}
		>
			{children}
		</div>
	);
}

export default Badge;
