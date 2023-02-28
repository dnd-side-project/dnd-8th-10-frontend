import React from 'react';

interface Props {
	disabled: boolean;
	onClick?: () => void;
}

function InputInteractButton({ disabled, onClick }: Props) {
	return (
		<button
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
