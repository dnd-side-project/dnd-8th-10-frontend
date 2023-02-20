import React from 'react';
import { TimeType } from 'src/app.modules/types/time';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';

interface Props {
	openSetTimeModalHandler: (flag: TimeType) => void;
	isStartTimeSet: boolean;
	isEndTimeSet: boolean;
	focusedType?: TimeType;
	startTimeText: string;
	endTimeText: string;
	resetTimeHandler: (flag: TimeType) => void;
	mode?: 'dark' | 'white';
}
function OpenSetTimeModalButtons({
	openSetTimeModalHandler,
	isStartTimeSet,
	isEndTimeSet,
	startTimeText,
	endTimeText,
	resetTimeHandler,
	focusedType,
	mode = 'white',
}: Props) {
	return (
		<div className="flex items-center justify-between">
			<div
				className={`${focusedType === 'startTime' ? 'time-set-button-border' : ''} ${
					mode === 'dark' ? 'bg-g1' : 'bg-w'
				} w-[14.5rem] h-[4.8rem] rounded-[0.8rem]  text-body2 text-start px-[1.2rem] relative flex items-center`}
			>
				<button
					onClick={() => openSetTimeModalHandler('startTime')}
					name="setStartTime"
					className="w-full h-full text-start"
				>
					{!isStartTimeSet ? <span className="text-g7">시작시간</span> : <span>{startTimeText}</span>}
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
				className={`${focusedType === 'endTime' ? 'time-set-button-border' : ''} ${
					mode === 'dark' ? 'bg-g1' : 'bg-w'
				} w-[14.5rem] h-[4.8rem] rounded-[0.8rem] bg-g1  text-body2 text-start px-[1.2rem] relative flex items-center`}
			>
				<button
					onClick={() => openSetTimeModalHandler('endTime')}
					name="setEndTime"
					className="w-full h-full text-start"
				>
					{!isEndTimeSet ? <span className="text-g7">종료시간</span> : <span>{endTimeText}</span>}
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
