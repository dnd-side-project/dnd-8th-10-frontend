import React, { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import SearchInput from 'src/app.components/app.base/Input/SearchInput';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PostCigaretteBody, PutInventoryBody } from 'src/app.modules/api/inventory';
import Bar from 'src/app.components/app.base/Button/Bar';
import Overlay from 'src/app.components/Modal/Overlay';
import useModal from 'src/app.modules/hooks/useModal';
import Modal from 'src/app.components/Modal/Modal';
import { useRouter } from 'next/router';
import FilterButtons from '../components/FilterButtons';
import InventoryList from '../components/InventoryListCopy';
import useCountHistory from '../hooks/useCountHistory';
import LastCheckModal from '../components/LastCheckModal';
import NewCigaSaveModal from '../components/NewCigaSaveModal';

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
// TODO: 마지막 요소 클릭 안됨
type ChoType = '전체' | 'ㄱ' | 'ㄴ' | 'ㄷ' | 'ㄹ' | 'ㅁ' | 'ㅂ' | 'ㅅ' | 'ㅇ' | 'ㅈ' | 'ㅊ' | 'ㅋ' | 'ㅌ' | 'ㅍ' | 'ㅎ';

interface Props {
	inventoryList: IInventoryList[];
	addCigarette: MutateTpye<PostCigaretteBody>;
	addCigaretteLoading: boolean;
	editInventory: MutateTpye<PutInventoryBody>;
	editInventoryLoading: boolean;
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
	editInventoryLoading,
	deleteInventoryMutate,
	workTimeStatus,
}: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const CHO_BUTTONS = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchCho, setSearchCho] = useState<ChoType>('전체');
	const [newCiga, setNewCiga] = useState<string>('');
	const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
	// TODO: 모달이름 바꾸기
	const { isModalOpen: isSaveModalOpen, closeAnimationModal: closeSaveModal, openModal: openSaveModal } = useModal();
	const { isModalOpen: isAddModalOpen, closeAnimationModal: closeAddModal, openModal: openAddModal } = useModal();
	const {
		isModalOpen: isBackAlertModalOpen,
		closeModal: closeBackAlertModal,
		openModal: openBackAlertModal,
	} = useModal();
	const {
		isModalOpen: isNotWorkTimeModalOpen,
		closeModal: closeNotWorkTimeModal,
		openModal: openNotWorkTimeModal,
	} = useModal();
	const router = useRouter();
	const goBackHandler = () => {
		if (Object.keys(countHistory).length && workTimeStatus !== 'error' && !isSaveBtnClicked) {
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
		setIsSaveBtnClicked(true);
	};
	const submitNewCigarette = () => {
		console.log('new 담배');
		if (addCigaretteLoading) return;
		const body = {
			inventoryName: newCiga,
		};
		addCigarette(body);
		setNewCiga('');
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
	const deletleInventoryHandler = (inventoryIdx: number) => {
		deleteInventoryMutate(inventoryIdx);
	};
	useEffect(() => {
		if (workTimeStatus === undefined) return;
		if (workTimeStatus === 'error') openNotWorkTimeModal();
	}, [workTimeStatus]);
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
					<InventoryList
						inventoryList={(searchCho === '전체'
							? inventoryList
							: inventoryList.filter((inventory) => getInitialSound(inventory.inventoryName) === searchCho)
						).filter((inventory) => inventory.inventoryName.includes(searchTerm))}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
						onInventoryDelete={deletleInventoryHandler}
					/>
				)}

				<div
					className="fixed bottom-[2rem]  w-screen -translate-x-[2rem] max-w-[50rem] px-[2rem] ciga-save-shadow  rounded-[0.8rem]  "
					aria-hidden={isSaveModalOpen || isAddModalOpen}
				>
					<Bar ClickFn={() => submitInventoryRecord('cigarette')}>점검사항 저장</Bar>
				</div>

				{isSaveModalOpen && (
					<LastCheckModal closeModal={closeSaveModal} countHistory={countHistory} category="cigarette" />
				)}
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
			{isNotWorkTimeModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeNotWorkTimeModal();
					}}
				>
					<Modal
						iconView
						title="근무시간이 아닙니다."
						subTitle="점검 중인 내용이저장되지 않습니다."
						yesFn={() => router.back()}
						yesTitle="종료"
						noFn={closeNotWorkTimeModal}
						noTitle="확인"
					/>
				</Overlay>
			)}
		</>
	);
}

export default CountCigaretteScreen;
