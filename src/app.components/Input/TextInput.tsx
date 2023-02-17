import React from 'react';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';

interface Props {
	searchTerm: string;
	onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetSearchTerm: () => void;
	placeholder: string;
	mode: 'default' | 'small' | 'wide';
}
function TextInput({ searchTerm, onSearchTermChange, resetSearchTerm, placeholder, mode = 'default' }: Props) {
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={onSubmit} className="relative">
			<input
				value={searchTerm}
				onChange={onSearchTermChange}
				placeholder={placeholder}
				type="search"
				className={`w-full h-[4.8rem] rounded-[0.8rem] bg-[#F8F8FA] ${
					mode === 'wide' ? 'p-[2rem]' : 'p-[1.2rem]'
				} text-body2   placeholder:text-g7 text-g9    outline-none`}
			/>
			{searchTerm && (
				<button onClick={resetSearchTerm} type="reset" className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
					<InputCancelIcon />
				</button>
			)}
		</form>
	);
}

export default TextInput;
