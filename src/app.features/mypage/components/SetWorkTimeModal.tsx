import React, { useEffect, useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import { WorkTimeOnModalType } from '../screens/WorkTimeSettingScreen';

interface Props {
	closeModal: () => void;
	onDone: () => void;
	time: WorkTimeOnModalType;
	onTimeChange: (e: React.BaseSyntheticEvent) => void;
}
function SetWorkTimeModal({ closeModal, onDone, onTimeChange, time }: Props) {
	const [isPop, setIsPop] = useState<boolean>();
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
				role="dialog"
				aria-modal="true"
				className={`bg-w rounded-t-[1.6rem] z-[102] fixed bottom-0 max-w-[50rem] -translate-x-[2rem] mx-auto w-full transition-transform duration-500 ease-in-out ${
					isPop ? 'transform translate-y-0' : 'transform translate-y-full'
				}`}
			>
				<div className="flex justify-center mt-[0.8rem] mb-[2.4rem]">
					<div className="w-[5rem] h-[0.4rem] bg-g4 rounded-[1rem]" />
				</div>
				<div className="px-[2rem] pb-[2rem]">
					<div>
						<div className="space-y-[2.4rem]">
							<SetTimeButtons timeHandler={onTimeChange} time={time} />

							<Bar
								ClickFn={() => {
									setIsPop(false);
									onDone();

									closeModal();
								}}
							>
								완료
							</Bar>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SetWorkTimeModal;
