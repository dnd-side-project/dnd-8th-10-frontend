import React from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import Schedule from './Schedule';
import { IMakeCal } from '../types';

function MakeCalendar({ year, month, firstDay, lastDate, schedule, toDay }: IMakeCal) {
	const days = [];
	const makeDay = (week: number) => {
		const result = [];
		// 첫 주
		if (week === 1) {
			const prevLastDate = Number(new Date(year, month, 0).getDate());

			for (let i = 1; i <= 7; i += 1) {
				// 저번 달 날짜
				if (i <= firstDay) {
					const now = prevLastDate - firstDay + i;
					// 이전 달 예시 날짜
					result.push(
						<span key={now} className="text-gray-400  flex justify-center items-center w-[30px] h-[30px] rounded">
							{now}
						</span>
					);
				}
				// 현재 달 날짜
				else {
					const now = i - firstDay;
					// 첫주 날짜
					const idx = transIdx(year, month, now);
					result.push(<div key={idx}>{Schedule(idx, schedule, toDay, now)}</div>);
				}
			}
		} else {
			const startDate = (week - 1) * 7;
			for (let i = startDate; i <= week * 7 - 1; i += 1) {
				// 현재 달 날짜
				if (i - firstDay < lastDate) {
					const now = i - firstDay + 1;
					// 2주~4주차 날짜
					const idx = transIdx(year, month, now);
					result.push(<div key={idx}>{Schedule(idx, schedule, toDay, now)}</div>);
				}
				// 다음 달 예시 날짜
				else {
					const now = i - lastDate - firstDay + 1;
					result.push(
						<span key={now} className="text-gray-400  flex justify-center items-center w-[30px] h-[30px]rounded">
							{now}
						</span>
					);
				}
			}
		}
		return result;
	};

	// 주 계산
	const week = Math.ceil((firstDay + lastDate) / 7);
	for (let i = 1; i <= week; i += 1) {
		days.push(
			<div className="flex justify-around items-center py-[15px]" key={week + i}>
				{makeDay(i)}
			</div>
		);
	}
	return days;
}

export default MakeCalendar;
