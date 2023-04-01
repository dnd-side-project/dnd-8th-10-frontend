import React, { useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { PutInventoryBodyType } from 'src/app.modules/api/inventory';
import FilterButtons from '../components/FilterButtons';
import InventorySave from '../components/InventoryCommonFlow/InventorySave';

import WorkTimeStatusModal from '../components/InventoryCommonFlow/WorkTimeStatusModal';
import InventoryHeader from '../components/InventoryHeader';
import InventoryList from '../components/InventoryList';
import useCountHistory from '../hooks/useCountHistory';
import { IInventory } from '../types';

interface Props {
	inventoryList: IInventory[];
	editInventory: MutateTpye<PutInventoryBodyType>;
	workTimeStatus: string;
}

function GarbageBagInventoryScreen({ inventoryList, editInventory, workTimeStatus }: Props) {
	const { countHistory, changeDiffHandler, isModified } = useCountHistory(inventoryList);
	const submitInventoryRecordHandler = () => {
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const category: IInventory['category'] = 'GARBAGEBAG';
		const body = { category, list };
		editInventory(body);
	};
	const [filter, setFilter] = useState<'일반 쓰레기' | '음식물 쓰레기'>('일반 쓰레기');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<WorkTimeStatusModal workTimeStatus={workTimeStatus} />
			<InventoryHeader title="쓰레기봉투" isNeedAlert={isModified} />

			<main className="overflow-y-scroll scrollbar-hidden  h-full text-g9 relative ">
				<div className="sticky w-full pb-[1.6rem] top-0 z-[50] pt-[7.2rem] bg-w">
					<FilterButtons
						filterHandler={filterHandler}
						selectedFilter={filter}
						filters={['일반 쓰레기', '음식물 쓰레기']}
					/>
				</div>
				{inventoryList && (
					<InventoryList
						inventoryList={inventoryList}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
					/>
				)}
				<InventorySave countHistory={countHistory} onInventoryRecordSubmit={submitInventoryRecordHandler} />
			</main>
		</>
	);
}

export default GarbageBagInventoryScreen;
