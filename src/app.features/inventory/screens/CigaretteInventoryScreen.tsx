import React, { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import SearchInput from 'src/app.components/app.base/Input/SearchInput';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PostCigaretteBody, PutInventoryBody } from 'src/app.modules/api/inventory';
import Bar from 'src/app.components/app.base/Button/Bar';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import InputInteractButton from 'src/app.components/Button/InputInteractButton';
import useModal from 'src/app.modules/hooks/useModal';
import FilterButtons from '../components/FilterButtons';
import InventoryList from '../components/InventoryList';
import useCountHistory from '../hooks/useCountHistory';
import LastCheckModal from '../components/LastCheckModal';

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
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const [newCiga, setNewCiga] = useState<string>('');
	// TODO: 모달이름 바꾸기
	const { isModalOpen: isSaveModalOpen, closeAnimationModal: closeSaveModal, openModal: openSaveModal } = useModal();
	const { isModalOpen: isAddModalOpen, closeAnimationModal: closeAddModal, openModal: openAddModal } = useModal();

	const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const searchChoHandler = (e: React.BaseSyntheticEvent) => {
		setSearchCho(e.target.value);
	};
	const clearSearchTerm = () => {
		setSearchTerm('');
	};
	const openSaveModalHandler = () => {
		if (isAddModalOpen) {
			closeAddModal();
		}
		openSaveModal();
	};
	const submitInventoryRecord = (category: string) => {
		if (editInventoryLoading) return;
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category, list };
		editInventory(body);
		openSaveModalHandler();
	};
	const submitNewCigarette = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('new 담배');
		if (addCigaretteLoading) return;
		const body = {
			inventoryName: newCiga,
		};
		addCigarette(body);
		closeAddModal();
	};

	const openAddModalHandler = () => {
		if (isSaveModalOpen) {
			closeSaveModal();
		}
		openAddModal();
	};
	const newCigaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCiga(e.target.value);
	};
	const resetCigaHandler = () => {
		setNewCiga('');
	};
	return (
		<>
			<Header title="담배">
				<button onClick={openAddModalHandler} className="text-primary text-subhead2">
					항목추가
				</button>
			</Header>

			<main className="space-y-[1.6rem] pt-[7.2rem]  h-[100vh] text-g9 relative overflow-hidden">
				<div className="space-y-[1.2rem]">
					<SearchInput
						searchTerm={searchTerm}
						onSearchTermChange={onSearchTermChange}
						resetSearchTerm={clearSearchTerm}
						placeholder="담배명 검색"
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
					aria-hidden={isSaveModalOpen || isAddModalOpen}
				>
					<Bar ClickFn={() => submitInventoryRecord('cigarette')}>점검사항 저장</Bar>
				</div>
				{isSaveModalOpen && (
					<LastCheckModal closeModal={closeSaveModal} countHistory={countHistory} category="cigarette" />
				)}
				{isAddModalOpen && (
					<Overlay overlayClickFn={closeAddModal}>
						<TopModal>
							<form onSubmit={submitNewCigarette} className="flex flex-col space-y-[1.2rem]">
								<label className="text-g10 text-subhead3" htmlFor="newCigarette">
									항목추가
								</label>
								<TextInput
									id="newCigarette"
									name="newCigarette"
									value={newCiga}
									onChange={newCigaHandler}
									resetHandler={resetCigaHandler}
									mode="default"
									placeholder="새 담배 입력"
								/>
								<div aria-hidden className="h-[6rem]" />
								<InputInteractButton type="submit" disabled={!newCiga.trim()} />
							</form>
						</TopModal>
					</Overlay>
				)}
			</main>
		</>
	);
}

export default CountCigaretteScreen;
