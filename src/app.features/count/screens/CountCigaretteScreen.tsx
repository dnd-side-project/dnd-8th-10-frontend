import React, { useEffect, useState } from 'react';
import { MOCK_CIGARETTE_LIST } from '../mockData/cigarretList';

const getInitialSound = (str: string) => {
	const CHO_LIST = [
		'ㄱ',
		'ㄲ',
		'ㄴ',
		'ㄷ',
		'ㄸ',
		'ㄹ',
		'ㅁ',
		'ㅂ',
		'ㅃ',
		'ㅅ',
		'ㅆ',
		'ㅇ',
		'ㅈ',
		'ㅉ',
		'ㅊ',
		'ㅋ',
		'ㅌ',
		'ㅍ',
		'ㅎ',
	];
	// 유니코드 한글 시작 위치 -> 44032
	const word = str.charCodeAt(0) - 44032;
	const jongseong = word % 28;
	const jungseong = ((word - jongseong) / 28) % 21;
	const choseong = ((word - jongseong) / 28 - jungseong) / 21;
	return CHO_LIST[choseong];
};
type ChoType = '전체' | 'ㄱ' | 'ㄴ' | 'ㄷ' | 'ㄹ' | 'ㅁ' | 'ㅂ' | 'ㅅ' | 'ㅇ' | 'ㅈ' | 'ㅊ' | 'ㅋ' | 'ㅌ' | 'ㅍ' | 'ㅎ';
function CountCigaretteScreen() {
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const searchChoHandler = (e: React.BaseSyntheticEvent) => {
		setSearchCho(e.target.value);
	};

	return (
		<div>
			<input
				value={searchTerm}
				onChange={searchTermHandler}
				placeholder="검색어를 입력해주세요."
				type="search"
				className="w-full h-[30px] mt-[20px] py-2 px-4  border border-black rounded-lg  "
			/>
			<ul className="flex flex-wrap gap-[8px]">
				{CHO_BUTTONS.map((cho, index) => (
					<li key={index}>
						<button
							value={cho}
							onClick={searchChoHandler}
							aria-pressed={searchCho === cho}
							className="w-[46px] h-[35px] border-[1px] rounded aria-pressed:bg-blue-300  "
						>
							{cho}
						</button>
					</li>
				))}
			</ul>
			<ul>
				{(searchCho === '전체'
					? MOCK_CIGARETTE_LIST
					: MOCK_CIGARETTE_LIST.filter((cigarette) => getInitialSound(cigarette.name) === searchCho)
				)
					.filter((cigarette) => cigarette.name.includes(searchTerm))
					.map((cigarette, index) => (
						<li key={index}>{cigarette.name}</li>
					))}
			</ul>
		</div>
	);
}

export default CountCigaretteScreen;
/* {MOCK_CIGARETTE_LIST.filter((cigarette) => cigarette.name.includes(searchTerm)).map((cigarette, index) => (
	<li key={index}>{cigarette.name}</li>
))} */
