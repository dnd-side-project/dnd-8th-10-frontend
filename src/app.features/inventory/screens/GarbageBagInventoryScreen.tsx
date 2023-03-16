import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import Header from 'src/app.components/Header';
import SmallPopup from 'src/app.components/Modal/SmallPopup';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PutInventoryBody } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';
import FilterButtons from '../components/FilterButtons';
import InventoryList from '../components/InventoryList';
import LastCheckModal from '../components/LastCheckModal';
import useCountHistory from '../hooks/useCountHistory';

interface Props {
	inventoryList: IInventoryList[];
	editInventory: MutateTpye<PutInventoryBody>;
	editInventoryLoading: boolean;
}

function GarbageBagInventoryScreen({ inventoryList, editInventory, editInventoryLoading }: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const { isModalOpen, closeAnimationModal: closeModal, openModal } = useModal();

	const submitInventoryRecord = (category: string) => {
		if (editInventoryLoading) return;
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category, list };
		console.log(body);
		editInventory(body);
	};
	const [filter, setFilter] = useState<'일반 쓰레기' | '음식물 쓰레기'>('일반 쓰레기');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e.target.value);
	};
	return (
		<>
			<Header title="쓰레기봉투" />

			<main className="space-y-[1.6rem] wrap  pt-[7.2rem] h-[100vh] text-g9 relative overflow-hidden">
				<FilterButtons
					filterHandler={filterHandler}
					selectedFilter={filter}
					filters={['일반 쓰레기', '음식물 쓰레기']}
				/>

				{inventoryList && (
					<InventoryList
						inventoryList={inventoryList.filter((item) => item.inventoryName.includes(filter))}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
					/>
				)}
				<div
					className="absolute bottom-0 pb-[2rem] pt-[8.8rem]  w-full fill-linear-gradient "
					aria-hidden={isModalOpen}
				>
					<Bar
						ClickFn={() => {
							submitInventoryRecord('garbagebag');
							openModal();
						}}
					>
						점검사항 저장
					</Bar>
				</div>
				{isModalOpen && <LastCheckModal closeModal={closeModal} countHistory={countHistory} category="garbagebag" />}
			</main>
		</>
	);
}

export default GarbageBagInventoryScreen;
