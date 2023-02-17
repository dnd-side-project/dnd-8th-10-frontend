import React from 'react';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';

interface Props {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetHandler?: () => void;
	placeholder: string;
	mode: 'default' | 'small' | 'wide';
}
function TextInput({ value, onChange, resetHandler, placeholder, mode = 'default' }: Props) {
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
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
				className={`w-full h-[4.8rem] rounded-[0.8rem] bg-[#F8F8FA] ${getPadding()} text-body2   placeholder:text-g7 text-g9    outline-none`}
			/>
			{Boolean(value) && (
				<button onClick={resetHandler} type="reset" className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
					<InputCancelIcon />
				</button>
			)}
		</form>
	);
}

export default TextInput;
