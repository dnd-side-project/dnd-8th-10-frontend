import React, { useState } from 'react';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PutInventoryBody } from 'src/app.modules/api/inventory';
import InventoryList from '../components/InventoryList';
import useCountHistory from '../hooks/useCountHistory';

interface Props {
	inventoryList: IInventoryList[];
	editInventory: MutateTpye<PutInventoryBody>;
	editInventoryLoading: boolean;
}
function GiftcardInventoryScreen({ inventoryList, editInventory, editInventoryLoading }: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory();
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
	return (
		<>
			<Header title="문화 상품권" />

			<main className="space-y-[2.4rem]  pt-[1.6rem] h-[calc(100vh-5.6rem)] text-g9 relative overflow-hidden">
				{inventoryList && (
					<InventoryList
						inventoryList={inventoryList}
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
						<button onClick={() => submitInventoryRecord('giftcard')} className=" w-full py-[2rem] bg-blue-500">
							점검사항 저장
						</button>
					</div>
				)}
			</main>
		</>
	);
}

export default GiftcardInventoryScreen;
