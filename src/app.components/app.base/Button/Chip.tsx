import React from 'react';

interface Props {
	value: string;
	item: string;
	isPressed: boolean;
	onClick: (e: React.BaseSyntheticEvent) => void;
	name?: string;
	mode: 'h40' | 'h58' | 'h32';
	className?: string;
	bgColor?: 'bg-w' | 'bg-g1';
}

function Chip({ value, item, onClick, isPressed, name, mode, className, bgColor = 'bg-w' }: Props) {
	const getSize = () => {
		if (mode === 'h40') {
			return 'h-[4rem]  min-h-[4rem] ';
		}
		if (mode === 'h58') {
			return 'h-[5.8rem] w-[5.8rem] min-h-[5.8rem] min-w-[5.8rem]';
		}
		return 'h-[3.2rem] w-[3.2rem] min-h-[3.2rem] min-w-[3.2rem]';
	};
	return (
		<button
			type="button"
			name={name}
			value={value}
			onClick={onClick}
			aria-pressed={isPressed}
			className={`${getSize()}  text-center leading-[100%] rounded-[0.8rem]  text-g7  aria-pressed:bg-g4  aria-pressed:text-g10 ${bgColor} ${className}  `}
		>
			{item}
		</button>
	);
}

export default Chip;
