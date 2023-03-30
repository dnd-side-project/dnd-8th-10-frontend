import React, { useEffect, useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { CommuteType, WorkTimeOnModalType } from 'src/app.modules/types/workTime';

interface Props {
	closeModal: () => void;
	onDone: (workTimeOnModal: WorkTimeOnModalType) => void;
	openModalFlag: CommuteType | null;
	initWorkTime?: WorkTimeOnModalType;
}
// TODO: 모달 대통합 이루기
function SetWorkTimeModal({ closeModal, onDone, openModalFlag, initWorkTime }: Props) {
	const INIT_WORK_TIME = {
		meridiem: null,
		hour: null,
		minute: null,
	};
	const [isPop, setIsPop] = useState<boolean>();
	const [workTimeOnModal, setWorkTimeOnModal] = useState<WorkTimeOnModalType>(initWorkTime ?? INIT_WORK_TIME);

	// 출퇴근 시간 설정 모달 상에 시간 버튼 클릭 핸들러
	const timeOnModalHandler = (e: React.BaseSyntheticEvent): void => {
		const {
			target: { name, value },
		} = e;
		const newValue = workTimeOnModal[name as keyof WorkTimeOnModalType] !== value ? value : null; // 기존에 눌려져 있었다면 not pressed 상태로 전환
		setWorkTimeOnModal({
			...workTimeOnModal,
			[name]: newValue,
		});
	};
	useEffect(() => {
		setIsPop(true);
	}, []);
	return (
		<div>
			<div
				role="presentation"
				onClick={() => {
					setIsPop(false);
					closeModal();
				}}
				className={`translate-x-0 z-[101] fixed max-w-[50rem] mx-auto top-0 left-0 bottom-0 right-0 bg-transparent-30% backdrop-filter backdrop-blur-[0.4rem]'
			
					transition-all duration-500 ease-in-out ${isPop ? 'opacity-100' : 'opacity-0'}
				`}
			/>
			<div
				aria-modal
				className={`bg-w rounded-t-[1.6rem] z-[102] fixed bottom-0 max-w-[50rem] -translate-x-[2rem] mx-auto w-full transition-transform duration-500 ease-in-out ${
					isPop ? 'transform translate-y-0' : 'transform translate-y-full'
				}`}
			>
				<div className="flex justify-center mt-[0.8rem] mb-[2.4rem]">
					<div className="w-[5rem] h-[0.4rem] bg-g4 rounded-[1rem]" />
				</div>
				<div className="px-[2rem] pb-[2rem]">
					<div className="space-y-[2.4rem] flex flex-col items-center">
						<span className="text-g10 text-subhead3">
							언제 {openModalFlag === 'startTime' ? '출근' : '퇴근'}하시나요?
						</span>
						<SetTimeButtons timeHandler={timeOnModalHandler} time={workTimeOnModal} />

						<Bar
							ClickFn={() => {
								setIsPop(false);
								onDone(workTimeOnModal);

								closeModal();
							}}
						>
							완료
						</Bar>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SetWorkTimeModal;
