import React, { useState } from 'react';
import SearchInput from 'src/app.components/app.base/Input/SearchInput';
import { MutateTpye } from 'src/app.modules/api/client';
import useModal from 'src/app.modules/hooks/useModal';
import { PostCigaretteBodyType, PutInventoryBodyType } from 'src/app.modules/api/inventory';
import FilterButtons from '../components/FilterButtons';
import CigaretteList from '../components/CigaretteList';
import useCountHistory from '../hooks/useCountHistory';
import NewCigaSaveModal from '../components/NewCigaSaveModal';
import { IInventory } from '../types';
import InventoryCommonBottom from '../components/InventoryCommonFlow/InventoryCommonBottom';
import { ChoType, CHO_BUTTONS } from '../types/ciga';
import { getInitialSound } from '../utils/getInitialSound';
import InventoryHeader from '../components/InventoryHeader';

interface Props {
	inventoryList: IInventory[];
	addCigarette: MutateTpye<PostCigaretteBodyType>;
	addCigaretteLoading: boolean;
	editInventory: MutateTpye<PutInventoryBodyType>;
	deleteInventoryMutate: MutateTpye<number>;
	workTimeStatus: string;
}
// TODO: 담배 시재 추가 중복이름 막기
function CountCigaretteScreen({
	inventoryList,
	addCigarette,
	addCigaretteLoading,
	editInventory,
	deleteInventoryMutate,
	workTimeStatus,
}: Props) {
	const { countHistory, changeDiffHandler, isModified } = useCountHistory(inventoryList);

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const [newCiga, setNewCiga] = useState<string>('');

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
	const submitInventoryRecord = () => {
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const category: IInventory['category'] = 'GIFTCARD';
		const body = { category, list };
		editInventory(body);
	};
	const submitNewCigarette = () => {
		if (addCigaretteLoading) return;
		const body = {
			inventoryName: newCiga,
		};
		addCigarette(body);
		setNewCiga('');
	};

	const openAddModalHandler = () => {
		openAddModal();
	};
	const newCigaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCiga(e.target.value);
	};
	const resetCigaHandler = () => {
		setNewCiga('');
	};
	const deletleInventoryHandler = (inventoryIdx: number) => {
		deleteInventoryMutate(inventoryIdx);
	};
	return (
		<>
			<InventoryHeader title="담배" isNeedAlert={isModified}>
				<button onClick={openAddModalHandler} className="text-primary text-subhead2">
					항목추가
				</button>
			</InventoryHeader>

			<main className="overflow-y-scroll scrollbar-hidden h-full bg-w  text-g9 relative">
				<div className="space-y-[1.2rem] sticky top-0 pt-[7.2rem]  pb-[1.6rem] bg-w z-[50]">
					<SearchInput
						searchTerm={searchTerm}
						onSearchTermChange={onSearchTermChange}
						resetSearchTerm={clearSearchTerm}
						placeholder="담배명 검색"
					/>
					<FilterButtons filterHandler={searchChoHandler} selectedFilter={searchCho} filters={CHO_BUTTONS} />
				</div>

				{inventoryList && (
					<CigaretteList
						inventoryList={(searchCho === '전체'
							? inventoryList
							: inventoryList.filter((inventory) => getInitialSound(inventory.inventoryName) === searchCho)
						).filter((inventory) => inventory.inventoryName.includes(searchTerm))}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
						onInventoryDelete={deletleInventoryHandler}
					/>
				)}

				<InventoryCommonBottom
					countHistory={countHistory}
					workTimeStatus={workTimeStatus}
					onInventoryRecordSubmit={submitInventoryRecord}
				/>
				{isAddModalOpen && (
					<NewCigaSaveModal
						closeModal={closeAddModal}
						newCiga={newCiga}
						onNewCigaChange={newCigaHandler}
						onReset={resetCigaHandler}
						onDone={submitNewCigarette}
					/>
				)}
			</main>
		</>
	);
}

export default CountCigaretteScreen;
