import React from 'react';

interface Props {
	value: string;
	item: string;
	isPressed: boolean;
	onClick: (e: React.BaseSyntheticEvent) => void;
	name?: string;
}
function Tap({ value, item, onClick, isPressed, name }: Props) {
	return (
		<button
			name={name}
			value={value}
			onClick={onClick}
			aria-pressed={isPressed}
			className="px-[1.05rem] py-[0.7rem] rounded-[0.8rem] border-[0.15rem] border-[#E8E8EB]  aria-pressed:bg-[#66666E]  aria-pressed:text-white aria-pressed:border-[#66666E]  "
		>
			{item}
		</button>
	);
}

export default Tap;
