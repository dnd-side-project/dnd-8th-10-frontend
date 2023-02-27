import React, { useRef } from 'react';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';
import SearchIcon from 'src/app.modules/assets/search.svg';

interface Props {
	searchTerm: string;
	onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetSearchTerm: () => void;
	placeholder?: string;
	isSearched?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
}
function SearchInput({
	searchTerm,
	onSearchTermChange,
	resetSearchTerm,
	placeholder = '검색어를 입력해주세요.',
	isSearched,
	onFocus,
	onBlur,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputRef?.current) return;
		inputRef.current.blur();
		if (!onBlur) return;
		onBlur();
	};
	return (
		<form onSubmit={onSubmit} className="relative">
			{!isSearched && <SearchIcon className="absolute left-[1.2rem] top-1/2 -translate-y-1/2" />}
			<input
				ref={inputRef}
				value={searchTerm}
				onChange={onSearchTermChange}
				placeholder={placeholder}
				type="search"
				onFocus={onFocus}
				onBlur={onBlur}
				readOnly={isSearched}
				className={`w-full h-[4.8rem] rounded-[0.8rem] bg-[#F8F8FA] ${
					isSearched ? 'pl-[1.2rem]' : 'pl-[4.4rem]'
				} text-body2   placeholder:text-g7 text-g9  pr-[1.2rem] py-[1.4rem] outline-none`}
			/>
			{searchTerm && (
				<button onClick={resetSearchTerm} type="reset" className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
					<InputCancelIcon />
				</button>
			)}
		</form>
	);
}

export default SearchInput;
