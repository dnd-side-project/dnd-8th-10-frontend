import React, { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import SearchInput from 'src/app.components/app.base/Input/SearchInput';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PostCigaretteBody, PutInventoryBody } from 'src/app.modules/api/inventory';
import Bar from 'src/app.components/app.base/Button/Bar';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import useModalStore from 'src/app.modules/store/modal';
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
	console.log(inventoryList);
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
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
	const openSaveModalHandler = () => {
		setIsSaveModalOpen(true);
		modalIsOpen();
	};

	console.log(isSaveModalOpen, isAddModalOpen);
	return (
		<>
			<Header title="담배">
				<button
					onClick={() => setIsAddModalOpen(true)}
					className="  border-[0.15rem] rounded-[0.8rem] border-g42 font-medium text-[1.4rem] leading-[1.96rem] text-[#66666E] w-[6.2rem] h-[2.8rem]"
				>
					항목추가
				</button>
			</Header>

			<main className="space-y-[1.6rem] pt-[7.2rem]  h-[100vh] text-g9 relative overflow-hidden">
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
					className="absolute bottom-0 pb-[2rem] pt-[8.8rem]  w-full fill-linear-gradient  "
					aria-hidden={isModalOpen}
				>
					<Bar ClickFn={openSaveModalHandler}>점검사항 확인</Bar>
				</div>
				{isSaveModalOpen && isModalOpen && (
					<Overlay>
						<TopModal>
							<div className="space-y-[2.4rem] flex flex-col items-start ">
								<div
									className={`before:content-[url('/images/checklist/cigarette_small.svg')] before:mr-[0.8rem] flex items-center`}
								>
									<span className="text-g10 text-subhead3">점검사항 확인</span>
								</div>

								<ul className="flex flex-col gap-[8px] w-full text-subhead-long2 ">
									{Object.entries(countHistory).map(([inventoryName, inventoryDiff], index) => (
										<li key={index} className="flex justify-between items-center ">
											<span className="">{inventoryName}</span>
											<span
												className={`${
													// eslint-disable-next-line no-nested-ternary
													inventoryDiff !== 0 ? (inventoryDiff > 0 ? 'text-primary' : 'text-secondary') : ''
												}`}
											>
												{inventoryDiff !== 0 && <>{inventoryDiff >= 0 && '+ '}</>}
												{inventoryDiff}
											</span>
										</li>
									))}
								</ul>
								<Bar ClickFn={() => submitInventoryRecord('cigarette')}>저장하기</Bar>
							</div>
						</TopModal>
					</Overlay>
				)}
				{isAddModalOpen && isModalOpen && (
					<Overlay>
						<TopModal>
							<div className="">
								<form onSubmit={submitNewCigarette} className="flex flex-col">
									<label htmlFor="newCigarette">항목추가</label>
									<input id="newCigarette" name="newCigarette" type="text" />
									<button type="submit" className=" w-full py-[2rem] bg-blue-500">
										항목추가
									</button>
								</form>
							</div>
						</TopModal>
					</Overlay>
				)}
			</main>
		</>
	);
}

export default CountCigaretteScreen;
