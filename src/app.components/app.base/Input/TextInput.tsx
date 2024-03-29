import React, { useRef } from 'react';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';
import SendCommentIcon from 'src/app.modules/assets/sendComment.svg';

interface Props {
	id?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	resetHandler?: () => void;
	submitHandler?: () => void;
	placeholder: string;
	mode: 'default' | 'small' | 'wide'; // TODO: 모드 없애기
	name?: string;
	onFocus?: () => void;
	onBlur?: () => void;
	type?: 'text' | 'tel' | 'number'; // TODO: 늘리기
}
function TextInput({
	id,
	value,
	onChange,
	resetHandler,
	submitHandler,
	placeholder,
	mode = 'default',
	name,
	onFocus,
	onBlur,
	onKeyDown,
	type = 'text',
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputRef?.current) return;
		inputRef.current.blur();
		if (!submitHandler) return;
		console.log('왜 안되냐');
		submitHandler();
	};
	const getPadding = () => {
		if (mode === 'wide') return 'px-[3.2rem] h-[6rem] min-h-[6rem] ';
		if (mode === 'default') return 'p-[1.2rem] py-[1.4rem] h-[4.8rem] min-h-[4.8rem]';
		return 'px-[1.2rem] py-[0.8rem] h-[3.6rem] min-h-[3.6rem]';
	};
	return (
		<form onSubmit={onSubmit} className="relative w-full">
			<input
				id={id}
				ref={inputRef}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type={type}
				className={`w-full ${
					mode !== 'wide' ? 'rounded-[0.8rem]' : ''
				} bg-[#F8F8FA] ${getPadding()} text-body2   placeholder:text-g7 text-g9   outline-none`}
				onBlur={onBlur}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
			/>
			{Boolean(value) && mode === 'default' && (
				<button
					aria-label="입력 정보 초기화"
					onClick={resetHandler}
					type="reset"
					className="absolute right-[1.6rem] top-1/2 -translate-y-1/2"
				>
					<InputCancelIcon />
				</button>
			)}
			{Boolean(value) && mode === 'wide' && (
				<button
					aria-label="댓글 업로드"
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
