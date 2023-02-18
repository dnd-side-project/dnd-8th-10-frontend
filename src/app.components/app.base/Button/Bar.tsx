import React from 'react';

interface Props {
	children: React.ReactNode;
	bgColor?: string;
	titleColor?: string;
	ClickFn?: () => void;
	disabled?: boolean;
}

function Bar({ children, titleColor = 'text-w', bgColor = 'bg-primary', ClickFn, disabled = false }: Props) {
	return (
		<button
			onClick={() => {
				if (ClickFn) {
					ClickFn();
				}
			}}
			disabled={disabled}
			type="button"
			className={`${titleColor} ${bgColor} disabled:bg-g2 disabled:text-g7 w-full h-[6rem] rounded-[0.8rem] text-subhead4`}
		>
			{children}
		</button>
	);
}

export default Bar;
