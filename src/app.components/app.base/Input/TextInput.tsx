import React, { useRef } from 'react';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';
import SendCommentIcon from 'src/app.modules/assets/sendComment.svg';

interface Props {
	id?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetHandler?: () => void;
	submitHandler?: () => void;
	placeholder: string;
	mode: 'default' | 'small' | 'wide';
	onFocus?: () => void;
	onBlur?: () => void;
	name?: string;
}
function TextInput({
	id,
	value,
	onChange,
	resetHandler,
	submitHandler,
	placeholder,
	mode = 'default',
	onFocus,
	onBlur,
	name,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputRef?.current) return;
		inputRef.current.blur();
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
				id={id}
				ref={inputRef}
				name={name}
				onFocus={onFocus}
				onBlur={onBlur}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type="text"
				className={`w-full ${
					mode !== 'wide' ? 'rounded-[0.8rem]' : ''
				} bg-[#F8F8FA] ${getPadding()} text-body2   placeholder:text-g7 text-g9    outline-none`}
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
