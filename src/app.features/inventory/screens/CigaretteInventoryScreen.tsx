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
interface ICigaretteList {
	inventoryIdx: number;
	inventoryName: string;
	category: string;
}
interface Props {
	cigaretteList: ICigaretteList[];
}
function CountCigaretteScreen({ cigaretteList }: Props) {
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const [countHistory, setCountHistory] = useState<CountHistoryType>({});
	// TODO: 모달이름 바꾸기
	const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const searchChoHandler = (e: React.BaseSyntheticEvent) => {
		setSearchCho(e.target.value);
	};
	const changeDiffHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: {
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
	const onNewCigaretteSubmit = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		console.log(e.target.newCigarette.value);
	};

	return (
		<>
			<header className="w-full h-[5.6rem]">헤더 자리</header>
			<div className="space-y-[2.4rem]  h-[calc(100vh-5.6rem)] text-[#66666E] relative overflow-hidden">
				<button onClick={() => setIsAddModalOpen(true)}>항목추가</button>
				<div className="space-y-[1.2rem]">
					<input
						value={searchTerm}
						onChange={searchTermHandler}
						placeholder="검색어를 입력해주세요."
						type="search"
						className="w-full h-[4.8rem] rounded-[0.8rem] bg-[#F8F8FA] pl-[4.4rem] text-body2 text-[#9E9EA9] pr-[1.2rem] py-[1.4rem]"
					/>
					<ul className="flex flex-wrap gap-x-[0.4rem] gap-y-[0.8rem] text-subhead2 ">
						{CHO_BUTTONS.map((cho, index) => (
							<li key={index}>
								<button
									value={cho}
									onClick={searchChoHandler}
									aria-pressed={searchCho === cho}
									className="px-[1.05rem] py-[0.8rem] rounded-[0.8rem] border-[0.15rem] border-[#E8E8EB]  aria-pressed:bg-[#66666E]  aria-pressed:text-white aria-pressed:border-[#66666E]  "
								>
									{cho}
								</button>
							</li>
						))}
					</ul>
				</div>
				<ul className="text-subhead-long2 fill-linear-gradient space-y-[3.2rem] h-full overflow-y-scroll scrollbar-hidden">
					{(searchCho === '전체'
						? cigaretteList
						: cigaretteList.filter((cigarette) => getInitialSound(cigarette.inventoryName) === searchCho)
					)
						.filter((cigarette) => cigarette.inventoryName.includes(searchTerm))
						.map((cigarette, index) => (
							<li key={index} className="flex w-full justify-between space-y-2">
								<span>{cigarette.inventoryName}</span>
								<div className="flex space-x-[1.2rem]">
									<button name="increase" data-name={cigarette.inventoryName} onClick={changeDiffHandler}>
										➕
									</button>
									<span>{0}</span>
									{/* 재고 차이 정보 안옴! */}
									<button name="decrease" data-name={cigarette.inventoryName} onClick={changeDiffHandler}>
										➖
									</button>
								</div>
							</li>
						))}
					{(searchCho === '전체'
						? cigaretteList
						: cigaretteList.filter((cigarette) => getInitialSound(cigarette.inventoryName) === searchCho)
					)
						.filter((cigarette) => cigarette.inventoryName.includes(searchTerm))
						.map((cigarette, index) => (
							<li key={index} className="flex w-full justify-between space-y-2">
								<span>{cigarette.inventoryName}</span>
								<div className="flex space-x-[1.2rem]">
									<button name="increase" data-name={cigarette.inventoryName} onClick={changeDiffHandler}>
										➕
									</button>
									<span>{0}</span>
									{/* 재고 차이 정보 안옴! */}
									<button name="decrease" data-name={cigarette.inventoryName} onClick={changeDiffHandler}>
										➖
									</button>
								</div>
							</li>
						))}
				</ul>
				<div className="absolute bottom-0 pb-[2rem] pt-[8.8rem]  w-full fill-linear-gradient   z-50">
					<button onClick={() => setIsSaveModalOpen(true)} className=" w-full py-[2rem] bg-blue-500">
						점검사항 확인
					</button>
				</div>
				{isSaveModalOpen && (
					<div className="bg-blue-300 w-full">
						<ul className="flex flex-col gap-[8px]">
							{Object.entries(countHistory).map((history, index) => (
								<li key={index} className="flex justify-between">
									<span className="">{history[0]}</span>
									<span>{history[1]}</span>
								</li>
							))}
						</ul>
						<button onClick={() => setIsSaveModalOpen(false)}>점검사항 확인</button>
					</div>
				)}
				{isAddModalOpen && (
					<div className="bg-blue-300 w-full ">
						<form onSubmit={onNewCigaretteSubmit} className="flex flex-col">
							<label htmlFor="newCigarette">항목추가</label>
							<input id="newCigarette" name="newCigarette" type="text" />
							<button type="submit" onClick={() => setIsSaveModalOpen(false)}>
								항목 추가
							</button>
						</form>
					</div>
				)}
			</div>
		</>
	);
}

export default CountCigaretteScreen;
