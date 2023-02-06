import Link from 'next/link';
import React, { BaseSyntheticEvent, useState } from 'react';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useRegisterUserStore, { DayType, WorkTimeType } from '../store';

// TODO: 시간 유효성체크 (끝나는 시간이 시작하는 시간보다 빠른지)
type Flag = 'startTime' | 'endTime' | null;
function SetTimeScreen() {
	const [selectedDay, setSelectedDay] = useState<DayType>('일');
	const {
		user: { workTime },
		setTime,
	} = useRegisterUserStore();
	// TODO: 모달오픈할때 기록했던 시간 보여주기
	// TODO: 넘어 갈 수 있는 조건 달성하는지 검사하기. 근무 요일이 있어야하고, 요일 선택했을경우, 시작시간 끝시간 모두 입력해야함
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const INIT_WORK_TIME = { meridiem: 'am' as 'am' | 'pm', hour: '1', minute: '0' };
	const [workTimeOnModal, setWorkTimeOnModal] = useState<{
		meridiem: 'am' | 'pm';
		hour: string;
		minute: string;
	}>(INIT_WORK_TIME);
	const timeOnModalHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setWorkTimeOnModal({
			...workTimeOnModal,
			[name]: value,
		});
	};
	const workTimeHandler = () => {
		const updatedWorkTime = {
			...workTime,
			[selectedDay]: {
				...workTime[selectedDay],
				[openModalFlag as 'startTime' | 'endTime']: {
					...workTimeOnModal,
				},
			},
		};
		setTime(updatedWorkTime);
		setOpenModalFlag(null);
		setWorkTimeOnModal(INIT_WORK_TIME);
	};
	const selectedDayHandler = (e: BaseSyntheticEvent) => {
		setSelectedDay(e.target.value);
	};
	console.log(workTime);
	return (
		<div>
			<div className="flex flex-col space-y-2">
				<div>
					<h2>요일 선택</h2>
					<ul className="grid  grid-cols-7">
						{['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
							<li key={index}>
								<button
									name="day"
									value={day}
									onClick={selectedDayHandler}
									aria-pressed={selectedDay === day}
									className="aria-pressed:bg-blue-300 bg-gray-300"
								>
									{day}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h2>시간 선택</h2>
					<div className="flex gap-1">
						<button onClick={() => setOpenModalFlag('startTime')} className="border border-black rounded">
							시작시간:{selectedDay}
							{workTime[selectedDay]?.startTime?.meridiem}
							{workTime[selectedDay]?.startTime?.hour ?? ''}시{workTime[selectedDay]?.startTime?.minute}
						</button>
						<span>~</span>
						<button onClick={() => setOpenModalFlag('endTime')} className="border border-black rounded">
							종료시간:{selectedDay}
							{workTime[selectedDay]?.startTime?.meridiem}
							{workTime[selectedDay]?.endTime?.hour ?? ''}시{workTime[selectedDay]?.endTime?.minute}
						</button>
					</div>
				</div>
			</div>
			{openModalFlag !== null && (
				<div>
					<SetTimeButtons timeHandler={timeOnModalHandler} time={workTimeOnModal} />
					<button onClick={workTimeHandler}>완료</button>
				</div>
			)}
			<Link href={`${SERVICE_URL.register}?page=4`}>다음으로</Link>
		</div>
	);
}

export default SetTimeScreen;
// : {startTime.hour}시 {startTime.minute}분 {startTime.meridiem}
// : {endTime.hour}시 {endTime.minute}분 {endTime.meridiem}
// (timeInfo.startTime.meridiem === 'pm' ? 12 : 0)
/*


{Object.entries(workTime).map(([day, timeInfo], index) => (
							<li key={index}>
								{day}(
								{`${+timeInfo.startTime.hour}:${timeInfo.startTime.minute}~${+timeInfo.startTime.hour}:${
									timeInfo.endTime.minute
								}`}
								)
							</li>
						))}
*/
