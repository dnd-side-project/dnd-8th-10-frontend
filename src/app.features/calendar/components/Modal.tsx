import React, { useEffect, useState } from 'react';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
import useRegisterUserStore from 'src/app.features/register/store';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import useStore from '../store';
import { ISchedule } from '../types';
type Flag = 'startTime' | 'endTime' | null;
function Modal({ children }: any) {
	// 더미 스케쥴
	const [schedule, _Setschedule] = useState({
		박수빈: {
			일: '오전 8시~오후 3시',
			목: '오후 2시~오후 12시',
		},
	});
	const { isDay, workDay } = useStore();
	const {
		user: { startTime, endTime },
		setTime,
	} = useRegisterUserStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const [openModalGroup, setOpenModalGroup] = useState<boolean>(false);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};

	useEffect(() => {
		setOpenModalFlag(null);
		setOpenModalGroup(false);
	}, [isDay]);

	const time = () => {
		let arr: string = '';
		const objectData: { [key: string]: string } = schedule.박수빈;
		Object.keys(objectData).forEach((key) => {
			if (getDayOfWeek(isDay) === key) {
				arr = objectData[key];
			}
		});
		return arr;
	};

	return (
		<div className="z-10  bg-[#F8F8F8] w-screen  absolute bottom-0 flex-col items-center justify-center">
			<div className="flex justify-center mt-3">
				<div className="w-[55px] h-[4px] bg-[#D9D9D9] rounded-lg"></div>
			</div>
			{!openModalGroup ? (
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
							{workDay ? time().split('~')[0] : `${startTime.meridiem} ${startTime.hour}시 ${startTime.minute}분`}
						</div>
						<span className="mx-[10px]">~</span>
						<div
							className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg"
							onClick={() => setOpenModalFlag('endTime')}
						>
							{workDay ? time().split('~')[1] : `${endTime.meridiem} ${endTime.hour}시 ${endTime.minute}분`}
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
							onClick={() => setOpenModalGroup(true)}
						>
							출근하기
						</button>
					</div>
				</div>
			) : (
				<div>출근내역</div>
			)}
		</div>
	);
}

export default Modal;
