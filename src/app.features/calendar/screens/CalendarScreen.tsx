import React, { useState } from 'react';
import { IDumy } from '../types/indes';
// 초기 캘린더 더미 상태
const today = new Date();
const dumyData = {
	year: today.getFullYear(),
	month: today.getMonth(),
};
function CalendarScreen() {
	const [calendar, setCalendar] = useState<IDumy>(dumyData);

	// 년도, 달
	const year = calendar.year;
	const month = calendar.month;
	const yearMonth = year + '.' + (month + 1);
	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	// Month 증가
	const onIncreases = () => {
		if (calendar.month < 11) {
			setCalendar((prev) => ({
				...prev,
				month: month + 1,
			}));
		} else {
			setCalendar((prev) => ({
				...prev,
				month: 0,
			}));
			setCalendar((prev) => ({
				...prev,
				year: year + 1,
			}));
		}
	};

	// Month 감소
	const onDecreases = () => {
		if (calendar.month > 0) {
			setCalendar((prev) => ({
				...prev,
				month: month - 1,
			}));
		} else {
			setCalendar((prev) => ({
				...prev,
				month: 11,
			}));
			setCalendar((prev) => ({
				...prev,
				year: year - 1,
			}));
		}
	};

	return (
		<div>
			<div className="flex w-[100%] mb-5">
				<button className="mr-[30px] font-[30px]" onClick={onDecreases}>
					&lt;
				</button>
				<p className="text-[20px] font-bold ">{yearMonth}</p>
				<button className="ml-[30px] font-[30px]" onClick={onIncreases}>
					&gt;
				</button>
			</div>
		</div>
	);
}

export default CalendarScreen;
