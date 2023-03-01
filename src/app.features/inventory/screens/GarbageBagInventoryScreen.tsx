import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import Header from 'src/app.components/Header';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PutInventoryBody } from 'src/app.modules/api/inventory';
import useModalStore from 'src/app.modules/store/modal';
import FilterButtons from '../components/FilterButtons';
import InventoryList from '../components/InventoryList';
import useCountHistory from '../hooks/useCountHistory';

interface Props {
	inventoryList: IInventoryList[];
	editInventory: MutateTpye<PutInventoryBody>;
	editInventoryLoading: boolean;
}

function GarbageBagInventoryScreen({ inventoryList, editInventory, editInventoryLoading }: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
	const submitInventoryRecord = (category: string) => {
		if (editInventoryLoading) return;
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category, list };
		console.log(body);
		editInventory(body);
		setIsSaveModalOpen(false);
	};
	const [filter, setFilter] = useState<'일반 쓰레기' | '음식물 쓰레기'>('일반 쓰레기');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e.target.value);
	};
	return (
		<>
			<Header title="쓰레기봉투" />

			<main className="space-y-[1.6rem]  pt-[7.2rem] h-[100vh] text-g9 relative overflow-hidden">
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
					className="absolute bottom-0 pb-[2rem] pt-[8.8rem]  w-full fill-linear-gradient   z-50 aria-hidden:hidden"
					aria-hidden={isSaveModalOpen}
				>
					<button onClick={() => setIsSaveModalOpen(true)} className=" w-full py-[2rem] bg-blue-500">
						점검사항 확인
					</button>
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
								<Bar ClickFn={() => submitInventoryRecord('garbagebag')}>저장하기</Bar>
							</div>
						</TopModal>
					</Overlay>
				)}
			</main>
		</>
	);
}

export default GarbageBagInventoryScreen;
