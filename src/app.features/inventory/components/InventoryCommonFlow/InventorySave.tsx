import Bar from 'src/app.components/app.base/Button/Bar';
import useModal from 'src/app.modules/hooks/useModal';
import { CountHistoryType } from '../../types';
import LastCheckModal from '../LastCheckModal';

interface Props {
	countHistory: CountHistoryType;
	onInventoryRecordSubmit: (countHistory: CountHistoryType) => void;
}
function InventorySave({ countHistory, onInventoryRecordSubmit }: Props) {
	const { isModalOpen, closeAnimationModal: closeModal, openModal } = useModal();

	return (
		<>
			<div
				className="fixed bottom-[2rem]  w-screen -translate-x-[2rem] max-w-[50rem] px-[2rem] ciga-save-shadow  rounded-[0.8rem]  "
				aria-hidden={isModalOpen}
			>
				<Bar
					ClickFn={() => {
						onInventoryRecordSubmit(countHistory);
						openModal();
					}}
				>
					점검사항 저장
				</Bar>
			</div>
			{isModalOpen && <LastCheckModal closeModal={closeModal} countHistory={countHistory} category="giftcard" />}
		</>
	);
}

export default InventorySave;
