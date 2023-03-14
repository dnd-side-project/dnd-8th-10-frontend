import React from 'react';
import { DayType, mappedDay, TimeType } from 'src/app.modules/types/workTime';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';

interface Props {
	openSetTimeModalHandler: (flag: TimeType) => void;
	isStartTimeSet: boolean;
	isEndTimeSet: boolean;
	focusedType?: TimeType | null;
	startTimeText: string;
	endTimeText: string;
	resetTimeHandler: (flag: TimeType) => void;
	day?: DayType;
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
}: Props) {
	console.log('asdfasdfadfaas', focusedType);
	return (
		<div className="flex items-center space-x-[0.8rem] justify-between">
			<div
				className={`  bg-g1
				 w-full h-[4.8rem] rounded-[0.8rem]  text-body2 text-start  relative flex items-center`}
			>
				<button
					onClick={() => openSetTimeModalHandler('startTime')}
					name="setStartTime"
					className={`w-full h-full rounded-[0.8rem] relative text-start ${
						focusedType === 'startTime' ? 'box-border time-set-button-border ' : ''
					} `}
				>
					{!isStartTimeSet ? (
						<span
							className={`absolute h-full ${
								focusedType === 'startTime'
									? 'text-primary top-[1.3rem]  left-[1.1rem]'
									: 'text-g7 top-[1.4rem]  left-[1.2rem]'
							}`}
						>
							{day && `${mappedDay[day]}요일 `}출근시간
						</span>
					) : (
						<span
							className={`absolute h-full ${
								focusedType === 'startTime' ? 'text-primary top-[1.3rem]  left-[1.1rem]' : 'top-[1.4rem]  left-[1.2rem]'
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
					className={`w-full rounded-[0.8rem]  h-full text-start relative ${
						focusedType === 'endTime' ? 'time-set-button-border box-border' : ''
					}`}
				>
					{!isEndTimeSet ? (
						<span
							className={`absolute h-full  ${
								focusedType === 'endTime'
									? 'text-primary top-[1.3rem]  left-[1.1rem]'
									: 'text-g7 top-[1.4rem]  left-[1.2rem]'
							}`}
						>
							{day && `${mappedDay[day]}요일 `}퇴근시간
						</span>
					) : (
						<span
							className={`absolute h-full  ${
								focusedType === 'endTime' ? 'text-primary top-[1.3rem]  left-[1.1rem]' : 'top-[1.4rem]  left-[1.2rem]'
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
