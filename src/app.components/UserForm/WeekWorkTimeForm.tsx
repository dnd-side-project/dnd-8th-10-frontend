import { BaseSyntheticEvent, useState } from 'react';
import DayButton from 'src/app.features/register/components/DayButton';
import useModal from 'src/app.modules/hooks/useModal';
import { CommuteType, dayMap, DayNumType, WeekWorkTimeType, WorkTimeOnModalType } from 'src/app.modules/types/workTime';
import OpenSetTimeModalButtons from '../Button/OpenSetTimeModalButtons';
import SetWorkTimeModal from '../Modal/SetWorkTimeModal';

interface Props {
	workTimeObj?: WeekWorkTimeType | null;
	onWorkTimeChange: (workTimeObj: WeekWorkTimeType) => void;
}
// TODO: 출퇴근 시간 모두 기입해야 수정,등록하게 수정필요
export function WeekWorkTimeForm({ workTimeObj, onWorkTimeChange }: Props) {
	console.log(workTimeObj);
	const DAY_NUM_LIST: DayNumType[] = ['6', '0', '1', '2', '3', '4', '5'];
	const [isAlertPop, setIsAlertPop] = useState<boolean>(false);
	const [focusedDay, setFocusedDay] = useState<DayNumType>();
	const [openModalFlag, setOpenModalFlag] = useState<CommuteType | null>(null);
	const { isModalOpen, openModal, closeAnimationModal } = useModal();

	// 요일 포커싱 핸들러
	const focusedDayHandler = (e: BaseSyntheticEvent): void => {
		if (focusedDay !== undefined && workTimeObj?.[focusedDay] && Object.keys(workTimeObj?.[focusedDay]).length === 1) {
			setIsAlertPop(true);
			return;
		} // 출,퇴근 시간 모두 입력해야 다른 요일을 포커싱할수 있음.
		setFocusedDay(e.target.value);
	};
	// 출 or 퇴근 시간설정 버튼 clear 버튼 눌렀을때
	const resetTimeHandler = (flag: CommuteType): void => {
		if (!focusedDay) return;
		if (isAlertPop) {
			setIsAlertPop(false);
		}
		let updatedWorkTime: WeekWorkTimeType;
		const temp = { ...workTimeObj?.[focusedDay] };
		delete temp[flag];
		if (Object.keys(temp ?? {}).length === 0) {
			// 포커싱된 요일의 출퇴근 시간 모두 클리어된상황
			updatedWorkTime = { ...workTimeObj } as WeekWorkTimeType;
			delete updatedWorkTime[focusedDay];
		} else {
			updatedWorkTime = {
				...workTimeObj,
				[focusedDay]: {
					...temp,
				},
			} as WeekWorkTimeType;
		}
		onWorkTimeChange(updatedWorkTime); // 클리어
	};

	// 출 or 퇴근 시간 설정 모달 상에서 완료 버튼을 눌렀을 때, 이때 workTimeObj의 상태를 업데이트 해준다.
	const workTimeObjHandler = (workTimeOnModal: WorkTimeOnModalType): void => {
		const { meridiem, hour, minute } = workTimeOnModal;
		if (meridiem === null && hour === null && minute === null) {
			resetTimeHandler(openModalFlag as CommuteType);
			return;
		}
		if (!meridiem || !hour || !minute) return;
		if (!focusedDay) return;
		const updatedWorkTime = {
			...(workTimeObj ?? {}),
			[focusedDay]: {
				...workTimeObj?.[focusedDay],
				[openModalFlag as CommuteType]: {
					...workTimeOnModal,
				},
			},
		} as WeekWorkTimeType;

		onWorkTimeChange(updatedWorkTime); // 1. workTimeObj의 상태를 업데이트
		setOpenModalFlag(null); // 2. 모달 닫기
	};

	// 출 or 퇴근 시간설정 모달 오픈
	const openSetTimeModalHandler = (flag: CommuteType): void => {
		if (!focusedDay) return;
		setOpenModalFlag(flag); // 출근 or 퇴근시간 포커싱 상태 정의
		openModal(); // 모달 열기
		if (isAlertPop) {
			setIsAlertPop(false);
		}
	};

	// 설정한 시간 obj -> string으로 변환
	// 오전 7 : 00 형태로 리턴
	const getWorkTimeText = (flag: CommuteType): string => {
		try {
			if (!focusedDay || !workTimeObj) return '';
			const {
				[flag]: { meridiem, hour, minute },
			} = workTimeObj[focusedDay];
			return `${meridiem === 'am' ? '오전' : '오후'} ${hour} : ${Number(minute) < 10 ? '0' : ''}${minute}`;
		} catch (e) {
			return '';
		}
	};
	return (
		<div className="flex flex-col space-y-[3.2rem]">
			<div className="space-y-[0.8rem] w-full">
				<h2 className="text-g6 text-body2">근무요일(복수선택 가능)</h2>
				<ul className="grid  grid-cols-7 max-w-[31rem] ml-[0.5rem] ">
					{DAY_NUM_LIST.map((item, index) => (
						<li key={index} className="mx-auto">
							<DayButton
								name="day"
								value={item}
								item={dayMap.get(item) ?? ''}
								onClick={focusedDayHandler}
								state={
									focusedDay === item
										? 'focus'
										: `${Object.keys(workTimeObj?.[item] ?? {}).length === 2 ? 'selected' : 'default'}`
								}
							/>
						</li>
					))}
				</ul>
			</div>
			{focusedDay && (
				<div className="space-y-[0.8rem]">
					<h2 className="text-g6 text-body2">근무 시간</h2>
					<div>
						<OpenSetTimeModalButtons
							onOpenSetTimeModal={openSetTimeModalHandler}
							startTimeText={getWorkTimeText('startTime')}
							endTimeText={getWorkTimeText('endTime')}
							onResetTime={resetTimeHandler}
							focusedType={openModalFlag}
							focusedDay={focusedDay}
							isAlertPop={isAlertPop}
						/>
						{isAlertPop && (
							<span className="text-secondary text-[1rem] leading-[1.8rem] -tracking-[0.06rem] ">
								출근과 퇴근시간을 모두 입력해주세요.
							</span>
						)}
					</div>
				</div>
			)}
			{isModalOpen && (
				<SetWorkTimeModal
					closeModal={() => {
						setOpenModalFlag(null); // 1. modal open flag 초기화
						closeAnimationModal(); // 2. 모달 닫기
					}}
					onDone={workTimeObjHandler}
					openModalFlag={openModalFlag}
					initWorkTime={workTimeObj?.[focusedDay as DayNumType]?.[openModalFlag as CommuteType]}
				/>
			)}
		</div>
	);
}
