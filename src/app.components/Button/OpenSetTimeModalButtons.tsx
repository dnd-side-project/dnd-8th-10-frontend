import React from 'react';
import { CommuteType, dayMap, DayNumType } from 'src/app.modules/types/workTime';
import InputCancelIcon from 'src/app.modules/assets/inputCancel.svg';

interface TempProps {
	onClick: () => void;
	onReset: () => void;
	isFocused: boolean;
	isAlertPop: boolean;
	isSet: boolean;
	timeText: string;
	dayText?: string;
}

function Button({ onClick, onReset, isFocused, isAlertPop, isSet, timeText, dayText }: TempProps) {
	return (
		<div className="bg-g1 w-full h-[4.8rem] rounded-[0.8rem]  text-body2  text-start  relative flex items-center">
			<button
				onClick={onClick}
				name="Set Time"
				className={`w-full h-full rounded-[0.8rem] relative text-start ${
					isFocused ? 'box-border border-[0.1rem] border-solid  border-primary text-primary' : ''
				}  ${isAlertPop ? ' box-border border-[0.1rem] border-solid  border-secondary' : ''} `}
			>
				{!isSet ? (
					<span
						className={`absolute h-full  ${
							isFocused || isAlertPop ? ' top-[1.3rem]  left-[1.1rem]' : 'text-g7 top-[1.4rem]  left-[1.2rem]'
						}`}
					>
						{dayText}요일 출근시간
					</span>
				) : (
					<span
						className={`absolute h-full ${
							isFocused || isAlertPop ? ' top-[1.3rem]  left-[1.1rem]' : 'top-[1.4rem]  left-[1.2rem]'
						}`}
					>
						{timeText}
					</span>
				)}
			</button>
			{isSet && (
				<button onClick={onReset} type="reset" className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
					<InputCancelIcon />
				</button>
			)}
		</div>
	);
}

interface Props {
	onOpenSetTimeModal: (flag: CommuteType) => void;
	focusedType?: CommuteType | null;
	startTimeText: string;
	endTimeText: string;
	onResetTime: (flag: CommuteType) => void;
	focusedDay?: DayNumType;
	isAlertPop?: boolean;
}
function OpenSetTimeModalButtons({
	onOpenSetTimeModal,
	startTimeText,
	endTimeText,
	onResetTime,
	focusedType,
	focusedDay,
	isAlertPop,
}: Props) {
	const IS_STARTTIME_SET = Boolean(startTimeText.trim());
	const IS_ENDTIME_SET = Boolean(endTimeText.trim());
	return (
		<div className="flex items-center space-x-[0.8rem] justify-between">
			<Button
				onClick={() => onOpenSetTimeModal('startTime')}
				onReset={() => onResetTime('startTime')}
				isFocused={focusedType === 'startTime'}
				isAlertPop={Boolean(isAlertPop)}
				isSet={IS_STARTTIME_SET}
				timeText={startTimeText}
				dayText={focusedDay && `${dayMap.get(focusedDay)}`}
			/>
			<span className="text-g8 text-subhead3">~</span>
			<Button
				onClick={() => onOpenSetTimeModal('endTime')}
				onReset={() => onResetTime('endTime')}
				isFocused={focusedType === 'endTime'}
				isAlertPop={Boolean(isAlertPop)}
				isSet={IS_ENDTIME_SET}
				timeText={endTimeText}
				dayText={focusedDay && `${dayMap.get(focusedDay)}`}
			/>
		</div>
	);
}

export default OpenSetTimeModalButtons;
