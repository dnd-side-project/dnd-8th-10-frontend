import React from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import { IMakeCal } from '../types';
import useStore from '../store';

function MakeCalendar({ year, monthView, firstDay, lastDate, schedule }: IMakeCal) {
	const { isDay, toDay, modalIsOpen } = useStore();
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
					const data = [];
					if (idx === toDay && workDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white text-[#5696FC] flex justify-center items-center w-[3rem] h-[3rem] bg-[#E8E8E8] border-solid border-[0.2rem] border-[#5696FC] rounded-lg"
							>
								{now}
							</span>
						);
					} else if (idx === toDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white text-[#5696FC] flex justify-center items-center w-[3rem] h-[3rem] border-[0.2rem] border-solid border-[#5696FC] rounded-lg"
							>
								{now}
							</span>
						);
					} else if (workDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white flex justify-center items-center w-[3rem] h-[3rem] bg-[#E8E8E8] rounded-lg"
							>
								{now}
							</span>
						);
					} else {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white  flex justify-center items-center w-[3rem] h-[3rem] rounded-lg"
							>
								{now}
							</span>
						);
					}

					result.push(
						<button type="button" onClick={() => modalIsOpen(idx, workDay)} className="cursor-pointer" key={idx}>
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
					const workDay = schedule.includes(now);
					const data = [];
					if (idx === toDay && workDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white text-[#5696FC] flex justify-center items-center w-[3rem] h-[3rem] bg-[#E8E8E8] border-solid border-[0.2rem] border-[#5696FC] rounded-lg"
							>
								{now}
							</span>
						);
					} else if (idx === toDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white text-[#5696FC] flex justify-center items-center w-[3rem] h-[3rem] border-solid border-[0.2rem] border-[#5696FC] rounded-lg"
							>
								{now}
							</span>
						);
					} else if (workDay) {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white flex justify-center items-center w-[3rem] h-[3rem] bg-[#E8E8E8] rounded-lg"
							>
								{now}
							</span>
						);
					} else {
						data.push(
							<span
								key={idx}
								aria-pressed={idx === isDay}
								className="aria-pressed:bg-[#5696FC] aria-pressed:text-white  flex justify-center items-center w-[3rem] h-[3rem] rounded-lg"
							>
								{now}
							</span>
						);
					}

					result.push(
						<button type="button" onClick={() => modalIsOpen(idx, workDay)} className="cursor-pointer" key={idx}>
							{data}
						</button>
					);
				}
				// 다음 달 예시 날짜
				else {
					const now = i - lastDate - firstDay + 1;
					result.push(
						<span key={now} className="text-gray-400  flex justify-center items-center w-[3rem] h-[3rem]rounded">
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
