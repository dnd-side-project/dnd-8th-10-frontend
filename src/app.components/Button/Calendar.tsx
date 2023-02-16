import React from 'react';

interface Props {
	value: string;
	item: string;
	state: 'default' | 'selected' | 'focus';
	onClick: (e: React.BaseSyntheticEvent) => void;
	name?: string;
}

function Calendar({ value, item, onClick, state, name }: Props) {
	console.log(state);
	const getBorderColor = () => {
		if (state === 'default') return 'border-g3';
		return 'border-g9';
	};
	const getTextColor = () => {
		if (state === 'focus') return 'text-white';
		return 'text-g9';
	};
	const getBgColor = () => {
		if (state === 'focus') return 'bg-g9';
		return 'bg-w';
	};
	return (
		<button
			name={name}
			value={value}
			onClick={onClick}
			className={`px-[1.05rem] py-[0.7rem] rounded-[0.8rem] border-[0.15rem] ${getBgColor()}  ${getBorderColor()} ${getTextColor()} `}
		>
			{item}
		</button>
	);
}

export default Calendar;
