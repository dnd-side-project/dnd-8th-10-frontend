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
	const getBorderStyle = () => {
		return `${state === 'default' ? 'border-g3 border-[0.15rem]' : ''}`;
	};
	const getTextColor = () => {
		if (state === 'focus') return 'text-white';
		if (state === 'default') return 'text-g9';
		return 'text-primary';
	};
	const getBgColor = () => {
		if (state === 'focus') return 'bg-primary';
		if (state === 'selected') return 'bg-primarySub';
		return 'bg-w';
	};
	return (
		<button
			name={name}
			value={value}
			onClick={onClick}
			className={`w-[3.4rem] text-subhead2 h-[3.4rem]  rounded-[0.8rem] leading-none   ${getBgColor()}  ${getBorderStyle()} ${getTextColor()} `}
		>
			{item}
		</button>
	);
}

export default Calendar;
