import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useModalStore from 'src/app.modules/store/modal';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import ProfileImage from 'src/app.components/ProfileImage';
import NomalButton from 'src/app.components/Button/NomalButton';
import { getToDay, getWorkList, MutateBody } from '../api';
import useStore from '../store';
import useTimeSetStore from '../store/time';
import Keypad from './Keypad';

type Flag = 'startTime' | 'endTime' | null;

interface Props {
	WorkMutate: MutateTpye<MutateBody>;
}
function Modal({ WorkMutate }: Props) {
	const { toDay, workDay, isDayReset, year, month } = useStore();
	const { modalIsClose } = useModalStore();
	const [workTime, setWorkTime] = useState<string>('');
	const { clickDay } = useStore();
	const router = useRouter();
	const {
		user: { startTime, endTime },
		setTime,
	} = useTimeSetStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const [clickYear, clickMonth, day] = clickDay.split('.');
	const [userName, setUserName] = useState([]);
	useEffect(() => {
		setOpenModalFlag(null);
		return () => setUserName([]);
	}, [clickDay]);

	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const { name, value } = e.target;
		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};

	const getWorkTimeString = () => {
		try {
			return `${startTime.hour.length === 1 && startTime.meridiem === 'am' ? '0' : ''}${
				+startTime.hour + (startTime.meridiem === 'am' ? 0 : 12)
			}:${startTime.minute.length === 1 ? '0' : ''}${startTime.minute}~${
				endTime.hour.length === 1 && endTime.meridiem === 'am' ? '0' : ''
			}${+endTime.hour + (endTime.meridiem === 'am' ? 0 : 12)}:${endTime.minute.length === 1 ? '0' : ''}${
				endTime.minute
			}`;
		} catch (e) {
			console.log(e);
			return '';
		}
	};
	// 출근하기 버튼
	const commute = () => {
		const workTimeData = workTime || getWorkTimeString();
		const [start, end] = workTimeData.split('~');
		const startSplit = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
		const endSplit = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
		const timeDiff = Math.abs((startSplit - endSplit) / 60);
		WorkMutate({ year: clickYear, month: clickMonth, day, workTime: workTimeData, workHour: timeDiff });
		isDayReset();
		modalIsClose();
	};

	// 오늘 누른 경우
	if (!workDay && clickDay === toDay) {
		const data = getToDay(getDayOfWeek(clickDay));
		data.then((res) => {
			if (res.data !== '') {
				setWorkTime(res.data);
			}
		});
	}

	// 과거 누른 경우 & 출근한 날 누른 경우
	if (workDay && new Date(clickDay) <= new Date(toDay) && userName.length === 0) {
		const data = getWorkList({ year: clickYear, month: clickMonth, day });
		data.then((res) => {
			setUserName(res.data.data);
		});
	}

	const workModify = () => {
		modalIsClose();
		router.push(`${SERVICE_URL.calendarModify}`);
	};
	const renderContent = () => {
		if (clickDay === 'keypad') {
			return <Keypad year={year} month={month} />;
		}
		if (!workDay && clickDay === toDay) {
			// 금일 클릭시
			// 출근하기
			return (
				<div>
					<div className="flex text-g9 mb-[0.8rem]">
						<div className="w-[50%]">
							<span className="text-subhead3">시작</span>
						</div>
						<div className="w-[50%]">
							<span className="text-subhead3 ml-[1.4rem]">종료</span>
						</div>
					</div>
					<div className="flex items-center mb-[2.4rem]">
						<button
							onClick={() => setOpenModalFlag('startTime')}
							className="w-[50%] h-[4.8rem] bg-w rounded-[0.8rem] text-body2 text-g9"
						>
							{workTime !== ''
								? workTime.split('~')[0]
								: `${startTime.hour}시 ${startTime.minute}분 ${startTime.meridiem}`}
						</button>
						<span className="text-subhead3 mx-[1rem]">~</span>
						<button
							onClick={() => setOpenModalFlag('endTime')}
							className="w-[50%] h-[4.8rem] bg-w rounded-[0.8rem] text-body2 text-g9"
						>
							{workTime !== '' ? workTime.split('~')[1] : `${endTime.hour}시 ${endTime.minute}분 ${endTime.meridiem}`}
						</button>
					</div>
					{openModalFlag !== null && (
						// 클릭한 날이 일하는 날이면 시간 받아온거 뿌리기
						// 클릭한 날이 일하는 날이 아니면 00시 00분
						<div>
							<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
						</div>
					)}
					<div>
						<NomalButton
							ClickFn={() => commute()}
							title="출근하기"
							disabled={workTime === '' && getWorkTimeString() === '01:00~01:00'}
						/>
					</div>
				</div>
			);
		}

		if (!workDay || new Date(clickDay) > new Date(toDay)) {
			// 근무 안된 날짜 클릭시, 미래 클릭시
			return (
				<div>
					<div className="flex justify-between">
						<div>
							<span className="text-subhead3 text-g9">
								{month}월 {day}일
							</span>
						</div>
						<div>
							{new Date(clickDay) < new Date(toDay) && (
								<button
									className="bg-w px-[0.9rem] py-[0.4rem] border-solid border-[0.15rem] border-g4  rounded-[0.8rem]"
									onClick={() => workModify()}
								>
									<span className="text-[1.4rem] text-g9">출근수정</span>
								</button>
							)}
						</div>
					</div>
					<div className="text-center m-[2.4rem]">
						<span className="text-body3 text-g7">아직 기록이 없어요.</span>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div className="flex justify-between">
					<div>
						<span className="text-subhead3 text-g9">
							{month}월 {day}일
						</span>
					</div>
					<button
						className="bg-w px-[0.9rem] py-[0.4rem] border-solid border-[0.15rem] border-g4  rounded-[0.8rem]"
						onClick={() => workModify()}
					>
						<span className="text-[1.4rem] text-g9">출근수정</span>
					</button>
				</div>
				<div>
					{userName.map((item: { name: string; workTime: string; userProfileCode: number }, index) => (
						<div className="my-[2.4rem] flex items-center" key={index}>
							<ProfileImage size="lg" userProfileCode={item?.userProfileCode} />
							<span className="text-subhead2 text-g10 mx-[0.8rem]">{item.name}</span>
							<span className="text-body2 text-g8">{item?.workTime}</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	return <div>{renderContent()}</div>;
}

export default Modal;
