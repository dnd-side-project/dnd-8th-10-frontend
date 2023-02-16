import React from 'react';

interface Props {
	// 2023.0.00 포맷으로 변경방법 -> const idx = transIdx(year, monthView, now)
	idx: string; // ex 달력의 키값... 2023.2.11
	day: number; // 1일, 2일, 3일... 일자
	workDay: boolean; // 출근했던 날이면 true
	toDay: string; // 금일 날짜 2023.2.11
	clickDay: string; // 클릭한 날짜 2023.2.11
}

function CalendarButton({ idx, workDay, day, toDay, clickDay }: Props) {
	const getClassName = () => {
		if (idx === toDay && workDay) {
			return 'aria-pressed:bg-primary aria-pressed:text-white text-primary flex justify-center items-center text-body2 w-[3rem] h-[3rem] text-center bg-g3 border-solid border-[0.2rem] border-primary rounded-[0.8rem]';
		}
		if (idx === toDay) {
			return 'aria-pressed:bg-primary aria-pressed:text-white text-primary flex justify-center items-center text-body2 w-[3rem] h-[3rem] text-center border-solid border-[0.2rem] border-primary rounded-[0.8rem]';
		}
		if (workDay) {
			return 'aria-pressed:bg-primary aria-pressed:text-white text-g9 flex justify-center items-center text-body2 w-[3rem] h-[3rem] text-center bg-g3 rounded-[0.8rem]';
		}
		return 'aria-pressed:bg-primary aria-pressed:text-white text-g9 flex justify-center items-center text-body2 w-[3rem] h-[3rem] text-center rounded-[0.8rem]';
	};

	return (
		<div key={idx} aria-pressed={idx === clickDay} className={getClassName()}>
			<span className="text-body2 w-[2.8rem] h-[2rem]">{day}</span>
		</div>
	);
}

export default CalendarButton;
