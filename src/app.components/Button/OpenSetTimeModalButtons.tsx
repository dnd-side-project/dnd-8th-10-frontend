import React from 'react';
import { CommuteType, dayMap, DayNumType } from 'src/app.modules/types/workTime';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';

interface Props {
	openSetTimeModalHandler: (flag: CommuteType) => void;
	isStartTimeSet: boolean;
	isEndTimeSet: boolean;
	focusedType?: CommuteType | null;
	startTimeText: string;
	endTimeText: string;
	resetTimeHandler: (flag: CommuteType) => void;
	day?: DayNumType;
	isAlertPop?: boolean;
}
function OpenSetTimeModalButtons({
	openSetTimeModalHandler,
	isStartTimeSet,
	isEndTimeSet,
	startTimeText,
	endTimeText,
	resetTimeHandler,
	focusedType,
	day,
	isAlertPop,
}: Props) {
	console.log('asdfasdfadfaas', focusedType);
	return (
		<div className="flex items-center space-x-[0.8rem] justify-between">
			<div
				className={`  bg-g1
				 w-full h-[4.8rem] rounded-[0.8rem]  text-body2  text-start  relative flex items-center`}
			>
				<button
					onClick={() => openSetTimeModalHandler('startTime')}
					name="setStartTime"
					className={`w-full h-full rounded-[0.8rem] relative text-start ${
						focusedType === 'startTime' ? 'box-border border-[0.1rem] border-solid  border-primary text-primary' : ''
					}  ${isAlertPop ? ' box-border border-[0.1rem] border-solid  border-secondary' : ''} `}
				>
					{!isStartTimeSet ? (
						<span
							className={`absolute h-full  ${
								focusedType === 'startTime' || isAlertPop
									? ' top-[1.3rem]  left-[1.1rem]'
									: 'text-g7 top-[1.4rem]  left-[1.2rem]'
							}`}
						>
							{day && `${dayMap.get(day)}요일 `}출근시간
						</span>
					) : (
						<span
							className={`absolute h-full ${
								focusedType === 'startTime' || isAlertPop
									? ' top-[1.3rem]  left-[1.1rem]'
									: 'top-[1.4rem]  left-[1.2rem]'
							}`}
						>
							{startTimeText}
						</span>
					)}
				</button>
				{isStartTimeSet && (
					<button
						onClick={() => resetTimeHandler('startTime')}
						type="reset"
						className="absolute right-[1.6rem] top-1/2 -translate-y-1/2"
					>
						<InputCancelIcon />
					</button>
				)}
			</div>
			<span className="text-g8 text-subhead3">~</span>
			<div
				className={` 
				w-full h-[4.8rem] rounded-[0.8rem] bg-g1  text-body2 text-start  relative flex items-center`}
			>
				<button
					onClick={() => openSetTimeModalHandler('endTime')}
					name="setEndTime"
					className={`w-full h-full rounded-[0.8rem] relative text-start ${
						focusedType === 'endTime' ? 'box-border border-[0.1rem] border-solid  border-primary text-primary' : ''
					}  ${isAlertPop ? ' box-border border-[0.1rem] border-solid  border-secondary' : ''} `}
				>
					{!isEndTimeSet ? (
						<span
							className={`absolute h-full  ${
								focusedType === 'endTime' || isAlertPop
									? ' top-[1.3rem]  left-[1.1rem]'
									: 'text-g7 top-[1.4rem]  left-[1.2rem]'
							}`}
						>
							{day && `${dayMap.get(day)}요일 `}퇴근시간
						</span>
					) : (
						<span
							className={`absolute h-full  ${
								focusedType === 'endTime' || isAlertPop ? ' top-[1.3rem]  left-[1.1rem]' : 'top-[1.4rem]  left-[1.2rem]'
							}`}
						>
							{endTimeText}
						</span>
					)}
				</button>
				{isEndTimeSet && (
					<button
						onClick={() => resetTimeHandler('endTime')}
						type="reset"
						name="setEndTime"
						className="absolute right-[1.6rem] top-1/2 -translate-y-1/2"
					>
						<InputCancelIcon />
					</button>
				)}
			</div>
		</div>
	);
}

export default OpenSetTimeModalButtons;
