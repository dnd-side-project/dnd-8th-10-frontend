import React, { useEffect, useState } from 'react';
import { MOCK_CIGARETTE_LIST, MOCK_CIGARETTE_NAME_LIST } from '../mockData/cigarretList';

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
// TODO: 타입 한 파일에 정리해 두기
// TODO: 담배 추가할때 같은 이름 담배있는지 체크
type ChoType = '전체' | 'ㄱ' | 'ㄴ' | 'ㄷ' | 'ㄹ' | 'ㅁ' | 'ㅂ' | 'ㅅ' | 'ㅇ' | 'ㅈ' | 'ㅊ' | 'ㅋ' | 'ㅌ' | 'ㅍ' | 'ㅎ';
type CountHistoryType = { [name: string]: number };
function CountCigaretteScreen() {
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const [countHistory, setCountHistory] = useState<CountHistoryType>({});
	const [isModalOpen, setIsModalOpen] = useState<boolean>();
	const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const searchChoHandler = (e: React.BaseSyntheticEvent) => {
		setSearchCho(e.target.value);
	};
	const changeDiffHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: {
				value,
				name,
				dataset: { name: cigaretteName },
			},
		} = e;
		const diff = MOCK_CIGARETTE_LIST.get(cigaretteName) as number;
		setCountHistory({
			...countHistory,
			[cigaretteName]: (countHistory[cigaretteName] ?? diff) + (name === 'decrease' ? -1 : 1),
		});
	};
	useEffect(() => {
		console.log(countHistory, MOCK_CIGARETTE_NAME_LIST);
	}, [countHistory]);
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
					? MOCK_CIGARETTE_NAME_LIST
					: MOCK_CIGARETTE_NAME_LIST.filter((cigarette) => getInitialSound(cigarette) === searchCho)
				)
					.filter((cigarette) => cigarette.includes(searchTerm))
					.map((cigarette, index) => (
						<li key={index} className="flex w-full justify-between space-y-2">
							<span>{cigarette}</span>
							<div className="flex">
								<button name="increase" data-name={cigarette} onClick={changeDiffHandler}>
									➕
								</button>
								<span>{countHistory[cigarette] ?? MOCK_CIGARETTE_LIST.get(cigarette)}</span>
								<button name="decrease" data-name={cigarette} onClick={changeDiffHandler}>
									➖
								</button>
							</div>
						</li>
					))}
			</ul>
			<button onClick={() => setIsModalOpen(true)}>점검사항 확인</button>
			{isModalOpen && (
				<div className="bg-blue-300 w-full">
					<ul className="flex flex-col gap-[8px]">
						{Object.entries(countHistory).map((history, index) => (
							<li key={index} className="flex justify-between">
								<span className="">{history[0]}</span>
								<span>{history[1]}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default CountCigaretteScreen;
