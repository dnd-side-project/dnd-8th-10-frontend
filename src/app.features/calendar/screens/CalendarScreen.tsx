import React, { useState } from 'react';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import { IDumy } from '../types/indes';
import { transIdx } from 'src/app.modules/util/calendar';
// 초기 캘린더 더미 상태
const today = new Date();
const dumyData = {
	year: today.getFullYear(),
	month: today.getMonth(),
	schedule: {
		박수빈: {
			일: '08:00~12:00',
			목: '14:00~24:00',
		},
	},
};
function CalendarScreen() {
	const [calendar, setCalendar] = useState<IDumy>(dumyData);

	// 년도, 달
	const year = calendar.year;
	const month = calendar.month;

	// 오늘 날짜
	const toDay = transIdx(today.getFullYear(), today.getMonth(), today.getDate());

	// 달력 표시 날짜
	const yearMonth = year + '.' + (month + 1);

	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	// 일정
	const schedule = calendar.schedule;

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
		<div className="p-[20px]">
			<div className="flex my-[15px]">
				{/* <button className="mr-[30px] font-[30px]" onClick={onDecreases}>
					&lt;
				</button> */}
				<p className="text-[20px] font-bold ">{yearMonth}</p>
				{/* <button className="ml-[30px] font-[30px]" onClick={onIncreases}>
					&gt;
				</button> */}
			</div>
			<div>
				<div>
					<div className="flex justify-around mb-[5px]">
						{WEEK.map((day, index) => (
							<span key={index}>{day}</span>
						))}
					</div>
					<div>
						{MakeCalendar({
							year,
							month,
							firstDay,
							lastDate,
							schedule,
							toDay,
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarScreen;
