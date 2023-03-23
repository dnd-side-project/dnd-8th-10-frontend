import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import Header from 'src/app.components/Header';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
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
	const {
		isModalOpen: isBackAlertModalOpen,
		closeModal: closeBackAlertModal,
		openModal: openBackAlertModal,
	} = useModal();
	const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
	const router = useRouter();
	const goBackHandler = () => {
		if (Object.keys(countHistory).length && !isSaveBtnClicked) {
			openBackAlertModal();
		} else router.back();
	};
	const submitInventoryRecord = (category: string) => {
		if (editInventoryLoading) return;
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category, list };
		console.log(body);
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

				{inventoryList && (
					<InventoryList
						inventoryList={inventoryList.filter((item) => item.inventoryName.includes(filter))}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
					/>
				)}
				<div
					className="fixed bottom-[2rem]  w-screen -translate-x-[2rem] max-w-[50rem] px-[2rem] ciga-save-shadow  rounded-[0.8rem]  "
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
