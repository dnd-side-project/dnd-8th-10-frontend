import React from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import { IMakeCal } from '../types';
import useStore from '../store';

function MakeCalendar({ year, monthView, firstDay, lastDate, schedule, toDay }: IMakeCal) {
	const { isDay, modalIsOpen } = useStore();
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
						<span key={now} className="text-gray-400  flex justify-center items-center w-[30px] h-[30px]">
							{now}
						</span>
					);
				}
				// 현재 달 날짜
				else {
					const now = i - firstDay;
					// 첫주 날짜
					const idx = transIdx(year, monthView, now);
					const workDay = [3, 6, 8, 13, 17].includes(now);
					const data = [];
					if (idx === toDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#026FEB] aria-pressed:text-white text-white flex justify-center items-center w-[30px] h-[30px] bg-black rounded-lg"
							>
								{now}
							</span>
						);
					} else if (workDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#026FEB] aria-pressed:text-white flex justify-center items-center w-[30px] h-[30px] bg-gray-200 rounded-lg"
							>
								{now}
							</span>
						);
					} else {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#026FEB] aria-pressed:text-white  flex justify-center items-center w-[30px] h-[30px] rounded-lg"
							>
								{now}
							</span>
						);
					}

					result.push(
						<button type="button" onClick={() => modalIsOpen(idx)} className="cursor-pointer" key={idx}>
							{data}
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
					const workDay = [3, 6, 8, 13, 17].includes(now);
					const data = [];
					if (idx === toDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white text-[#5696FC] flex justify-center items-center w-[30px] h-[30px] border-2 border-[#5696FC] rounded-lg"
							>
								{now}
							</span>
						);
					} else if (workDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white flex justify-center items-center w-[30px] h-[30px] bg-gray-200 rounded-lg"
							>
								{now}
							</span>
						);
					} else {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white  flex justify-center items-center w-[30px] h-[30px] rounded-lg"
							>
								{now}
							</span>
						);
					}

					result.push(
						<button type="button" onClick={() => modalIsOpen(idx)} className="cursor-pointer" key={idx}>
							{data}
						</button>
					);
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
