import React from 'react';

interface Props {
	type?: string;
	children: React.ReactNode;
	bgColor?: string;
	titleColor?: string;
	ClickFn?: () => void;
	disabled?: boolean;
}

function Bar({
	type = 'default',
	children,
	titleColor = 'text-w',
	bgColor = 'bg-primary',
	ClickFn,
	disabled = false,
}: Props) {
	const className = () => {
		if (type === 'default') {
			return 'rounded-[0.8rem] w-full';
		}
		if (type === 'wide') {
			return 'fixed max-w-[42rem] mx-auto inset-x-0 bottom-0';
		}
		if (type === 'wide2') {
			return 'h-[8rem] fixed max-w-[42rem] mx-auto inset-x-0 bottom-0 pt-[1.9rem] pb-[3.9rem]';
		}
	};
	return (
		<button
			onClick={() => {
				if (ClickFn) {
					ClickFn();
				}
			}}
			disabled={disabled}
			type="button"
			className={`${className()} ${titleColor} ${bgColor} disabled:bg-g1 disabled:text-g7  h-[6rem] text-subhead4`}
		>
			{children}
		</button>
	);
}

export default Bar;
