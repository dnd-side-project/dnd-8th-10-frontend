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
			return 'aria-pressed:bg-[#5696FC] aria-pressed:text-white text-[#5696FC] flex justify-center items-center w-[3rem] h-[3rem] bg-[#E8E8E8] border-solid border-[0.2rem] border-[#5696FC] rounded-lg';
		}
		if (idx === toDay) {
			return 'aria-pressed:bg-[#5696FC] aria-pressed:text-white text-[#5696FC] flex justify-center items-center w-[3rem] h-[3rem] border-solid border-[0.2rem] border-[#5696FC] rounded-lg';
		}
		if (workDay) {
			return 'aria-pressed:bg-[#5696FC] aria-pressed:text-white flex justify-center items-center w-[3rem] h-[3rem] bg-[#E8E8E8] rounded-lg';
		}
		return 'aria-pressed:bg-[#5696FC] aria-pressed:text-white  flex justify-center items-center w-[3rem] h-[3rem] rounded-lg';
	};

	return (
		<div key={idx} aria-pressed={idx === clickDay} className={getClassName()}>
			<span>{day}</span>
		</div>
	);
}

export default CalendarButton;
