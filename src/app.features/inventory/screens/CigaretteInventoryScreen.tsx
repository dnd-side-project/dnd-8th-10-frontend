import React, { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import SearchInput from 'src/app.components/Input/SearchInput';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PostCigaretteBody, PutInventoryBody } from 'src/app.modules/api/inventory';
import FilterButtons from '../components/FilterButtons';
import InventoryList from '../components/InventoryList';
import useCountHistory from '../hooks/useCountHistory';

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

interface Props {
	inventoryList: IInventoryList[];
	addCigarette: MutateTpye<PostCigaretteBody>;
	addCigaretteLoading: boolean;
	editInventory: MutateTpye<PutInventoryBody>;
	editInventoryLoading: boolean;
}
function CountCigaretteScreen({
	inventoryList,
	addCigarette,
	addCigaretteLoading,
	editInventory,
	editInventoryLoading,
}: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory();
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');

	// TODO: 모달이름 바꾸기
	const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const searchChoHandler = (e: React.BaseSyntheticEvent) => {
		setSearchCho(e.target.value);
	};
	const clearSearchTerm = () => {
		setSearchTerm('');
	};

	const submitInventoryRecord = (category: string) => {
		if (editInventoryLoading) return;
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category, list };
		editInventory(body);
		setIsSaveModalOpen(false);
	};
	const submitNewCigarette = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		if (addCigaretteLoading) return;
		const body = {
			inventoryName: e.target.newCigarette.value,
		};
		addCigarette(body);
		setIsAddModalOpen(false);
	};

	return (
		<>
			<Header title="담배" />
			<button
				onClick={() => setIsAddModalOpen(true)}
				className="absolute right-0  border-[0.15rem] rounded-[0.8rem] border-g42 font-medium text-[1.4rem] leading-[1.96rem] text-[#66666E] w-[6.2rem] h-[2.8rem]"
			>
				항목추가
			</button>
			<main className="space-y-[2.4rem] pt-[1.6rem]  h-[calc(100vh-5.6rem)] text-g9 relative overflow-hidden">
				<div className="space-y-[1.2rem]">
					<SearchInput
						searchTerm={searchTerm}
						onSearchTermChange={onSearchTermChange}
						resetSearchTerm={clearSearchTerm}
					/>
					<FilterButtons filterHandler={searchChoHandler} selectedFilter={searchCho} filters={CHO_BUTTONS} />
				</div>
				{inventoryList && (
					<InventoryList
						inventoryList={(searchCho === '전체'
							? inventoryList
							: inventoryList.filter((inventory) => getInitialSound(inventory.inventoryName) === searchCho)
						).filter((inventory) => inventory.inventoryName.includes(searchTerm))}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
					/>
				)}
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
						<button onClick={() => submitInventoryRecord('cigarette')} className=" w-full py-[2rem] bg-blue-500">
							점검사항 저장
						</button>
					</div>
				)}
				{isAddModalOpen && (
					<div
						className=" pb-[2rem] pt-[8.8rem]  bg-white aria-hidden:hidden  w-full  left-0 bottom-0   z-50 fixed"
						aria-hidden={!isAddModalOpen}
					>
						<form onSubmit={submitNewCigarette} className="flex flex-col">
							<label htmlFor="newCigarette">항목추가</label>
							<input id="newCigarette" name="newCigarette" type="text" />
							<button type="submit" className=" w-full py-[2rem] bg-blue-500">
								항목추가
							</button>
						</form>
					</div>
				)}
			</main>
		</>
	);
}

export default CountCigaretteScreen;
