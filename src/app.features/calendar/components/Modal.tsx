import React, { useState } from 'react';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
import useRegisterUserStore from 'src/app.features/register/store';
import useStore from '../store';
type Flag = 'startTime' | 'endTime' | null;
function Modal({ children }: any) {
	const { isDay } = useStore();
	console.log(isDay);
	const {
		user: { startTime, endTime },
		setTime,
	} = useRegisterUserStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};
	return (
		<div className="z-10  bg-[#F8F8F8] w-screen  absolute bottom-0 flex-col items-center justify-center">
			<div className="flex justify-center mt-3">
				<div className="w-[55px] h-[4px] bg-[#D9D9D9] rounded-lg"></div>
			</div>
			<div className="px-[20px] py-[40px]">
				<div className="flex">
					<div className="w-[50%] font-semibold">시작</div>
					<div className="w-[50%] font-semibold">종료</div>
				</div>
				<div className="flex items-center my-3">
					<div
						className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg"
						onClick={() => setOpenModalFlag('startTime')}
					>
						{startTime.meridiem} {startTime.hour}시 {startTime.minute}분
					</div>
					<span className="mx-[10px]">~</span>
					<div className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg" onClick={() => setOpenModalFlag('endTime')}>
						{endTime.meridiem} {endTime.hour}시 {endTime.minute}분
					</div>
				</div>
				{openModalFlag !== null && (
					<div>
						<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
					</div>
				)}
				<div className="mt-5 mb-7">
					<button
						className="bg-[#D9D9D9] w-full py-[20px] font-semibold rounded-lg"
						onClick={() => setOpenModalFlag(null)}
					>
						출근하기
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
