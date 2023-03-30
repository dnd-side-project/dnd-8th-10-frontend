import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from 'src/app.components/Header';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import { MutateTpye } from 'src/app.modules/api/client';
import { PutInventoryBodyType } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';
import FilterButtons from '../components/FilterButtons';
import InventoryCommonFlow from '../components/InventoryCommonFlow';
import { CountHistoryType, IInventory } from '../types';

interface Props {
	inventoryList: IInventory[];
	editInventory: MutateTpye<PutInventoryBodyType>;
	workTimeStatus: string;
}

function GarbageBagInventoryScreen({ inventoryList, editInventory, workTimeStatus }: Props) {
	const {
		isModalOpen: isBackAlertModalOpen,
		closeModal: closeBackAlertModal,
		openModal: openBackAlertModal,
	} = useModal();

	const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
	const router = useRouter();
	const goBackHandler = () => {
		// Object.keys(countHistory).length &&
		if (workTimeStatus !== 'error' && !isSaveBtnClicked) {
			openBackAlertModal();
		} else router.back();
	};
	const submitInventoryRecord = (countHistory: CountHistoryType) => {
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const category: IInventory['category'] = 'GARBAGEBAG';
		const body = { category, list };
		editInventory(body);
		setIsSaveBtnClicked(true);
	};
	const [filter, setFilter] = useState<'일반 쓰레기' | '음식물 쓰레기'>('일반 쓰레기');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<Header title="쓰레기봉투" onBack={goBackHandler} />

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
				/>
			</main>
			{isBackAlertModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeBackAlertModal();
					}}
				>
					<Modal
						iconView
						title="시재점검을 종료하시는건가요?"
						subTitle="점검 중인 내용이 저장되지 않습니다"
						yesFn={() => router.back()}
						yesTitle="종료"
						noFn={closeBackAlertModal}
						noTitle="아니오"
					/>
				</Overlay>
			)}
		</>
	);
}

export default GarbageBagInventoryScreen;
