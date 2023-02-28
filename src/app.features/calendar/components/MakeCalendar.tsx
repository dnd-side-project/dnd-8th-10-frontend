import React from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import useModalStore from 'src/app.modules/store/modal';
import Calendar from 'src/app.components/app.base/Button/Calendar';
import useStore from '../store';
import { IMakeCal } from '../types';

function MakeCalendar({ year, monthView, firstDay, lastDate, schedule }: IMakeCal) {
	const { toDay, clickDay, modalCalData } = useStore();
	const { modalIsOpen } = useModalStore();
	const { month, day } = schedule;
	const days = [];

	const makeDay = (week: number) => {
		const result = [];
		// 첫 주
		if (week === 1) {
			const prevLastDate = Number(new Date(year, monthView, 0).getDate());

			for (let i = 1; i <= 7; i += 1) {
				// 저번 달 날짜
				if (i <= firstDay) {
					const now = prevLastDate - firstDay + i;
					// 이전 달 예시 날짜
					result.push(<div key={now} className="w-[3rem] h-[3rem]" />);
				}
				// 현재 달 날짜
				else {
					const now = i - firstDay;
					// 첫주 날짜
					const idx = transIdx(year, monthView, now);
					const workDay = day.includes(now) && monthView === month;
					result.push(
						<button
							type="button"
							onClick={() => {
								modalIsOpen();
								modalCalData(idx, workDay);
							}}
							className="cursor-pointer text-g10 first:text-g7 last:text-g7"
							key={idx}
						>
							<Calendar idx={idx} workDay={workDay} day={now} toDay={toDay} clickDay={clickDay} />
						</button>
					);
				}
			}
		} else {
			const startDate = (week - 1) * 7;
			for (let i = startDate; i <= week * 7 - 1; i += 1) {
				// 현재 달 날짜
				if (i - firstDay < lastDate) {
					const now = i - firstDay + 1;
					// 2주~4주차 날짜
					const idx = transIdx(year, monthView, now);
					const workDay = day.includes(now) && monthView === month;
					result.push(
						<button
							type="button"
							onClick={() => {
								modalIsOpen();
								modalCalData(idx, workDay);
							}}
							className="cursor-pointer text-g10 first:text-g7 last:text-g7"
							key={idx}
						>
							<Calendar idx={idx} workDay={workDay} day={now} toDay={toDay} clickDay={clickDay} />
						</button>
					);
				} else {
					const now = i - lastDate - firstDay + 1;
					result.push(<div key={now} className="w-[3rem] h-[3rem]" />);
				}
			}
		}
		return result;
	};

	// 주 계산
	const week = Math.ceil((firstDay + lastDate) / 7);
	for (let i = 1; i <= week; i += 1) {
		days.push(
			<li className="flex justify-between mb-[3.2rem] last:mb-0 mx-[0.9rem]" key={week + i}>
				{makeDay(i)}
			</li>
		);
	}
	return days;
}

export default MakeCalendar;
