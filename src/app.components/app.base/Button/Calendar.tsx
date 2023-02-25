import React from 'react';

interface Props {
	// 2023.0.00 포맷으로 변경방법 -> const idx = transIdx(year, monthView, now)
	idx: string; // ex 달력의 키값... 2023.2.11
	day: number; // 1일, 2일, 3일... 일자
	workDay: boolean; // 출근했던 날이면 true
	toDay: string; // 금일 날짜 2023.2.11
	clickDay: string; // 클릭한 날짜 2023.2.11
}

function Calendar({ idx, workDay, day, toDay, clickDay }: Props) {
	const getClassName = () => {
		const basic =
			'aria-pressed:bg-primary aria-pressed:text-w flex justify-center items-center text-body2 w-[3rem] h-[3rem] rounded-[0.8rem]';
		const borderAdded = `${basic} text-primary  border-solid border-[0.15rem] border-primary`;
		if (idx === toDay && workDay) {
			return `${borderAdded} bg-g3`;
		}
		if (idx === toDay) {
			return borderAdded;
		}
		if (workDay) {
			return `${basic} bg-[#E5EFFF]`;
		}
		return `${basic}`;
	};

	return (
		<span key={idx} aria-pressed={idx === clickDay} className={getClassName()}>
			{day}
		</span>
	);
}

export default Calendar;
