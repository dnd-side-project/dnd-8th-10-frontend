import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModal from 'src/app.modules/hooks/useModal';

interface Props {
	workTimeStatus: string;
}
function WorkTimeStatusModal({ workTimeStatus }: Props) {
	const router = useRouter();
	const {
		isModalOpen: isNotWorkTimeModalOpen,
		closeModal: closeNotWorkTimeModal,
		openModal: openNotWorkTimeModal,
	} = useModal();
	useEffect(() => {
		if (workTimeStatus === undefined) return;
		if (workTimeStatus === 'error') openNotWorkTimeModal();
	}, [workTimeStatus]);
	return (
		<>
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

export default WorkTimeStatusModal;
