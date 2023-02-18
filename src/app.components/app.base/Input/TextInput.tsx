import React from 'react';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';
import SendCommentIcon from 'src/app.modules/assets/sendComment.svg';

interface Props {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetHandler?: () => void;
	submitHandler?: () => void;
	placeholder: string;
	mode: 'default' | 'small' | 'wide';
}
function TextInput({ value, onChange, resetHandler, submitHandler, placeholder, mode = 'default' }: Props) {
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!submitHandler) return;
		submitHandler();
	};
	const getPadding = () => {
		if (mode === 'wide') return 'p-[2rem] ';
		if (mode === 'default') return 'p-[1.2rem] py-[1.4rem]';
		return 'px-[1.2rem] py-[0.8rem]';
	};
	return (
		<form onSubmit={onSubmit} className="relative">
			<input
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type="text"
				className={`w-full rounded-[0.8rem] bg-[#F8F8FA] ${getPadding()} text-body2   placeholder:text-g7 text-g9    outline-none`}
			/>
			{Boolean(value) && mode === 'default' && (
				<button onClick={resetHandler} type="reset" className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
					<InputCancelIcon />
				</button>
			)}
			{Boolean(value) && mode === 'wide' && (
				<button
					type={mode === 'wide' ? 'submit' : 'reset'}
					className="absolute right-[1.6rem] top-1/2 -translate-y-1/2"
				>
					<SendCommentIcon />
				</button>
			)}
		</form>
	);
}

export default TextInput;
