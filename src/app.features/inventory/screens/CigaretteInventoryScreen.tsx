import React, { useEffect, useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { PostCigaretteBody, PutInventoryBody } from 'src/app.modules/api/inventory';
import PlusIcon from 'src/app.modules/assets/checklist/addCircle.svg';
import MinusIcon from 'src/app.modules/assets/checklist/minusCircle.svg';
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
	inventoryCount: number;
}
interface Props {
	cigaretteList: ICigaretteList[];
	addCigarette: MutateTpye<PostCigaretteBody>;
	addCigaretteLoading: boolean;
	editInventory: MutateTpye<PutInventoryBody>;
	editInventoryLoading: boolean;
}
function CountCigaretteScreen({
	cigaretteList,
	addCigarette,
	addCigaretteLoading,
	editInventory,
	editInventoryLoading,
}: Props) {
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
	const changeDiffHandler = (action: 'decrease' | 'increase', cigaretteName: string, cigaretteDiff: number) => {
		setCountHistory({
			...countHistory,
			[cigaretteName]: (countHistory[cigaretteName] ?? cigaretteDiff) + (action === 'decrease' ? -1 : 1),
		});
	};
	const onNewCigaretteSubmit = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		console.log(e.target.newCigarette.value);
	};
	const submitInventoryRecord = () => {
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category: 'cigarette', list };
		editInventory(body);
		setIsSaveModalOpen(false);
	};
	const submitNewCigarette = () => {};
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
							<li key={index} className="flex w-full items-center justify-between ">
								<span>{cigarette.inventoryName}</span>

								<div className="flex relative  space-x-[3.2rem]">
									<button
										name="increase"
										data-name={cigarette.inventoryName}
										data-diff={cigarette.inventoryCount}
										onClick={() => changeDiffHandler('increase', cigarette.inventoryName, cigarette.inventoryCount)}
									>
										<PlusIcon />
									</button>
									<span className="absolute right-[3.8rem]">
										{countHistory[cigarette.inventoryName] ?? cigarette.inventoryCount}
									</span>
									<button
										name="decrease"
										data-name={cigarette.inventoryName}
										data-diff={cigarette.inventoryCount}
										onClick={() => changeDiffHandler('decrease', cigarette.inventoryName, cigarette.inventoryCount)}
									>
										<MinusIcon />
									</button>
								</div>
							</li>
						))}
				</ul>
				<div
					className="absolute bottom-0 pb-[2rem] pt-[8.8rem]  w-full fill-linear-gradient   z-50 aria-hidden:hidden"
					aria-hidden={isSaveModalOpen || isAddModalOpen}
				>
					<button onClick={() => setIsSaveModalOpen(true)} className=" w-full py-[2rem] bg-blue-500">
						점검사항 확인
					</button>
				</div>
				{isSaveModalOpen && (
					<div
						className=" pb-[2rem] pt-[8.8rem]  bg-white aria-hidden:hidden  w-full  left-0 bottom-0   z-50 fixed"
						aria-hidden={!isSaveModalOpen}
					>
						<ul className="flex flex-col gap-[8px]">
							{Object.entries(countHistory).map((history, index) => (
								<li key={index} className="flex justify-between">
									<span className="">{history[0]}</span>
									<span>{history[1]}</span>
								</li>
							))}
						</ul>
						<button onClick={submitInventoryRecord} className=" w-full py-[2rem] bg-blue-500">
							점검사항 저장
						</button>
					</div>
				)}
				{isAddModalOpen && (
					<div
						className=" pb-[2rem] pt-[8.8rem]  bg-white aria-hidden:hidden  w-full  left-0 bottom-0   z-50 fixed"
						aria-hidden={!isAddModalOpen}
					>
						<form onSubmit={onNewCigaretteSubmit} className="flex flex-col">
							<label htmlFor="newCigarette">항목추가</label>
							<input id="newCigarette" name="newCigarette" type="text" />
							<button onClick={submitNewCigarette} className=" w-full py-[2rem] bg-blue-500">
								항목추가
							</button>
						</form>
					</div>
				)}
			</div>
		</>
	);
}

export default CountCigaretteScreen;
