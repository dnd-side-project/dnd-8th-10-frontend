import React from 'react';
import InputCancleIcon from 'src/app.modules/assets/inputCancel.svg';

interface Props {
	searchTerm: string;
	onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetSearchTerm: () => void;
	placeholder?: string;
}
function SearchInput({
	searchTerm,
	onSearchTermChange,
	resetSearchTerm,
	placeholder = '검색어를 입력해주세요.',
}: Props) {
	return (
		<form className="relative">
			<input
				value={searchTerm}
				onChange={onSearchTermChange}
				placeholder={placeholder}
				type="search"
				className="w-full h-[4.8rem] rounded-[0.8rem] bg-[#F8F8FA] pl-[4.4rem] text-body2 text-[#9E9EA9] pr-[1.2rem] py-[1.4rem] outline-none"
			/>
			{searchTerm && (
				<button onClick={resetSearchTerm} type="reset" className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
					<InputCancleIcon />
				</button>
			)}
		</form>
	);
}

export default SearchInput;
