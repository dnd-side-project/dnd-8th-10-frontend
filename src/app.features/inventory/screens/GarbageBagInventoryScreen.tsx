import React, { useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { PutInventoryBodyType } from 'src/app.modules/api/inventory';
import FilterButtons from '../components/FilterButtons';
import InventoryCommonFlow from '../components/InventoryCommonFlow';
import InventoryHeader from '../components/InventoryHeader';
import { CountHistoryType, IInventory } from '../types';

interface Props {
	inventoryList: IInventory[];
	editInventory: MutateTpye<PutInventoryBodyType>;
	workTimeStatus: string;
}

function GarbageBagInventoryScreen({ inventoryList, editInventory, workTimeStatus }: Props) {
	const [isModified, setIsModified] = useState<boolean>(false);
	const submitInventoryRecord = (countHistory: CountHistoryType) => {
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
			<InventoryHeader title="쓰레기봉투" isNeedAlert={isModified} />

			<main className="overflow-y-scroll scrollbar-hidden  h-full text-g9 relative ">
				<div className="sticky w-full pb-[1.6rem] top-0 z-[50] pt-[7.2rem] bg-w">
					<FilterButtons
						filterHandler={filterHandler}
						selectedFilter={filter}
						filters={['일반 쓰레기', '음식물 쓰레기']}
					/>
				</div>
				<InventoryCommonFlow
					inventoryList={inventoryList?.filter((item) => item.inventoryName.includes(filter))}
					workTimeStatus={workTimeStatus}
					onInventoryRecordSubmit={submitInventoryRecord}
					onModified={() => setIsModified(true)}
				/>
			</main>
		</>
	);
}

export default GarbageBagInventoryScreen;
