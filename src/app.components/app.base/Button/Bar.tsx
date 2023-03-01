import React from 'react';

interface Props {
	mode?: 'default' | 'wide' | 'wide2'; // 모드 가능한 타입 명시, 타입이랑 이름 중복 피해서 mode로 이름변경
	type?: 'reset' | 'submit' | 'button'; // 버튼타입 지정 prop
	children: React.ReactNode;
	bgColor?: string;
	titleColor?: string;
	ClickFn?: () => void;
	disabled?: boolean;
}

function Bar({
	mode = 'default',
	type = 'button',
	children,
	titleColor = 'text-w',
	bgColor = 'bg-primary',
	ClickFn,
	disabled = false,
}: Props) {
	const className = () => {
		if (mode === 'wide') {
			return 'fixed max-w-[42rem] mx-auto inset-x-0 bottom-0';
		}
		if (mode === 'wide2') {
			return 'h-[8rem] fixed max-w-[42rem] mx-auto inset-x-0 bottom-0 pt-[1.9rem] pb-[3.9rem]';
		}
		return 'rounded-[0.8rem] w-full';
	};
	return (
		<button
			onClick={() => {
				if (ClickFn) {
					ClickFn();
				}
			}}
			disabled={disabled}
			type={type} // 버튼 타입 지정
			className={`${className()} ${titleColor} ${bgColor} disabled:bg-g1 disabled:text-g7  h-[6rem] min-h-[6rem] text-subhead4`}
		>
			{children}
		</button>
	);
}

export default Bar;
