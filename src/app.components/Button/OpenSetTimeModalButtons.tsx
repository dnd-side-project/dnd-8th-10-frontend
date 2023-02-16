import React from 'react';
import { TimeType } from 'src/app.modules/types/time';

interface Props {
	openSetTimeModalHandler: (flag: TimeType) => void;
	isStartTimeSet: boolean;
	isEndTimeSet: boolean;
	startTimeText: string;
	endTimeText: string;
}
function OpenSetTimeModalButtons({
	openSetTimeModalHandler,
	isStartTimeSet,
	isEndTimeSet,
	startTimeText,
	endTimeText,
}: Props) {
	return (
		<div className="flex items-center justify-between">
			<button
				onClick={() => openSetTimeModalHandler('startTime')}
				className="w-[14.5rem] h-[4.8rem] rounded-[0.8rem] bg-g1  text-body2 text-start px-[1.2rem] relative"
			>
				{!isStartTimeSet ? <span className="text-g7">시작시간</span> : <span>{startTimeText}</span>}
			</button>
			<span className="text-g8 text-subhead3">~</span>
			<button
				onClick={() => openSetTimeModalHandler('endTime')}
				className="w-[14.5rem] h-[4.8rem] rounded-[0.8rem] bg-g1  text-body2 text-start px-[1.2rem] relative"
			>
				{!isEndTimeSet ? <span className="text-g7">종료시간</span> : <span>{endTimeText}</span>}
			</button>
		</div>
	);
}

export default OpenSetTimeModalButtons;
