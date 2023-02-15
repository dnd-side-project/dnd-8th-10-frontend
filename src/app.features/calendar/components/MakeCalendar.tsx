import React from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import CalendarButton from 'src/app.components/Button/CalendarButton';
import useModalStore from 'src/app.modules/store/modal';
import { IMakeCal } from '../types';
import useStore from '../store';

function MakeCalendar({ year, monthView, firstDay, lastDate, schedule }: IMakeCal) {
	const { toDay, clickDay, modalCalData } = useStore();
	const { modalIsOpen } = useModalStore();
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
					result.push(
						<span key={now} className=" text-gray-400  flex justify-center items-center w-[3rem] h-[3rem]">
							{now}
						</span>
					);
				}
				// 현재 달 날짜
				else {
					const now = i - firstDay;
					// 첫주 날짜
					const idx = transIdx(year, monthView, now);
					const workDay = schedule.includes(now);
					result.push(
						<button
							type="button"
							onClick={() => {
								modalIsOpen();
								modalCalData(idx, workDay);
							}}
							className="cursor-pointer"
							key={idx}
						>
							<CalendarButton idx={idx} workDay={workDay} day={now} toDay={toDay} clickDay={clickDay} />
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
					const workDay = schedule.includes(now);

					result.push(
						<button
							type="button"
							onClick={() => {
								modalIsOpen();
								modalCalData(idx, workDay);
							}}
							className="cursor-pointer"
							key={idx}
						>
							<CalendarButton idx={idx} workDay={workDay} day={now} toDay={toDay} clickDay={clickDay} />
						</button>
					);
				}
				// 다음 달 예시 날짜
				else {
					const now = i - lastDate - firstDay + 1;
					result.push(
						<span key={now} className="text-gray-400 flex justify-center items-center w-[3rem] h-[3rem]rounded">
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
			<div className="text-[1.4rem] flex justify-around items-center py-[1.5rem]" key={week + i}>
				{makeDay(i)}
			</div>
		);
	}
	return days;
}

export default MakeCalendar;
