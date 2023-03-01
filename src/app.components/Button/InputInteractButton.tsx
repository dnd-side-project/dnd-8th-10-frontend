import React, { useEffect, useRef } from 'react';

interface Props {
	disabled: boolean;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
}

function InputInteractButton({ disabled, onClick, type = 'button' }: Props) {
	const btnRef = useRef<HTMLButtonElement>(null);
	const handleResize = (e: any) => {
		console.log('reszie', e);
		const btn = btnRef?.current;
		if (btn === null) return;
		if (!btn) return;

		btn.style.animationName = 'expand';
		btn.style.animationPlayState = 'running';
	};
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<button
			ref={btnRef}
			type={type}
			disabled={disabled}
			onClick={onClick}
			id="saveBtn"
			className="bg-primary disabled:bg-g1 disabled:text-g4 text-w  h-[6rem] min-h-[6rem] text-subhead4  resizing-button"
		>
			저장
		</button>
	);
}

export default InputInteractButton;
