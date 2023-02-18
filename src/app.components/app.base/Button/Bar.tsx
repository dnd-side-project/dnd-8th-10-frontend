import React from 'react';

interface Props {
	children: React.ReactElement;
	bgColor?: string;
	titleColor?: string;
	ClickFn?: () => void;
	disabled?: boolean;
}

function Bar({ children, titleColor, bgColor, ClickFn, disabled = false }: Props) {
	const className = () => {
		if (titleColor !== undefined && bgColor !== undefined) {
			return `${titleColor} ${bgColor}`;
		}
		return `${disabled ? 'bg-g2 text-g7' : 'bg-primary text-w'}`;
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
			className={`${className()} w-full h-[6rem] rounded-[0.8rem] text-subhead4`}
		>
			{children}
		</button>
	);
}

export default Bar;