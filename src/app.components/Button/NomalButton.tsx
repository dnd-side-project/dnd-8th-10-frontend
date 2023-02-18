import React from 'react';

interface Props {
	title: string;
	bgColor: string;
	titleColor: string;
	ClickFn?: () => void;
	disabled?: boolean;
}

function NomalButton({ title, titleColor, bgColor, ClickFn, disabled = false }: Props) {
	return (
		<button
			onClick={() => {
				if (ClickFn) {
					ClickFn();
				}
			}}
			disabled={disabled}
			type="button"
			className={`${bgColor} ${titleColor} w-full h-[6rem] rounded-[0.8rem] text-subhead4`}
		>
			{title}
		</button>
	);
}

export default NomalButton;
