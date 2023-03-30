import React, { useState } from 'react';
import Header from 'src/app.components/Header';
import SearchInput from 'src/app.components/app.base/Input/SearchInput';
import { MutateTpye } from 'src/app.modules/api/client';
import Overlay from 'src/app.components/Modal/Overlay';
import useModal from 'src/app.modules/hooks/useModal';
import Modal from 'src/app.components/Modal/Modal';
import { useRouter } from 'next/router';
import { PostCigaretteBodyType, PutInventoryBodyType } from 'src/app.modules/api/inventory';
import FilterButtons from '../components/FilterButtons';
import CigaretteList from '../components/CigaretteList';
import useCountHistory from '../hooks/useCountHistory';
import NewCigaSaveModal from '../components/NewCigaSaveModal';
import { IInventory } from '../types';
import InventoryCommonBottom from '../components/InventoryCommonFlow/InventoryCommonBottom';
import { ChoType } from '../types/ciga';

// 담배의 초성추출
const getInitialSound = (str: string): string => {
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

interface Props {
	inventoryList: IInventory[];
	addCigarette: MutateTpye<PostCigaretteBodyType>;
	addCigaretteLoading: boolean;
	editInventory: MutateTpye<PutInventoryBodyType>;
	deleteInventoryMutate: MutateTpye<number>;
	workTimeStatus: string;
}
// TODO: 담배 시재 추가 중복이름 막기
// TODO: 담배 시재 하고 나면 뒤로가기 버튼 눌렀을때 경고 모달 안뜨게 하기
function CountCigaretteScreen({
	inventoryList,
	addCigarette,
	addCigaretteLoading,
	editInventory,
	deleteInventoryMutate,
	workTimeStatus,
}: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const [newCiga, setNewCiga] = useState<string>('');
	const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
	const { isModalOpen: isAddModalOpen, closeAnimationModal: closeAddModal, openModal: openAddModal } = useModal();
	const {
		isModalOpen: isBackAlertModalOpen,
		closeModal: closeBackAlertModal,
		openModal: openBackAlertModal,
	} = useModal();
	const router = useRouter();
	const goBackHandler = () => {
		// Object.keys(countHistory).length &&
		if (workTimeStatus !== 'error' && !isSaveBtnClicked) {
			openBackAlertModal();
		} else router.back();
	};
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
		setIsSaveBtnClicked(true);
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
			<Header title="담배" onBack={goBackHandler}>
				<button onClick={openAddModalHandler} className="text-primary text-subhead2">
					항목추가
				</button>
			</Header>

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

export default CountCigaretteScreen;
