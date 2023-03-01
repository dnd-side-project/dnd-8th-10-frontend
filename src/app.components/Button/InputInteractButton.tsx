import React, { useEffect, useRef } from 'react';

interface Props {
	disabled: boolean;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
}

function InputInteractButton({ disabled, onClick, type = 'button' }: Props) {
	const btnRef = useRef<HTMLButtonElement>(null);
	const prevHeight = useRef<number>();
	useEffect(() => {
		const btn = btnRef?.current;
		if (btn === null) return;
		const { body } = document;
		prevHeight.current = window.innerHeight;
		const observer = new ResizeObserver((entries) => {
			const { height } = entries[0].contentRect;
			if (!prevHeight.current) return;
			if (height < prevHeight?.current) {
				// eslint-disable-next-line no-unused-expressions
				if (btn.style.animationName !== 'expand') {
					btn.style.animationName = 'expand';
					btn.style.animationPlayState = 'running';
				}
			} else if (height > prevHeight?.current) {
				// eslint-disable-next-line no-unused-expressions, no-lonely-if
				if (btn.style.animationName !== 'shrink') {
					btn.style.animationName = 'shrink';
					btn.style.animationPlayState = 'running';
				}
			}
			prevHeight.current = height;
		});

		observer.observe(body);
		// eslint-disable-next-line consistent-return
		return () => observer.unobserve(body);
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
