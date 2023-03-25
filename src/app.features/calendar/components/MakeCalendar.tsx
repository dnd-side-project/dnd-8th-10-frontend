import React from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import Calendar from 'src/app.components/app.base/Button/Calendar';
import useStore from '../store';
import { IMakeCal } from '../types';

function MakeCalendar({ year, monthView, firstDay, lastDate, schedule, openModal }: IMakeCal) {
	const { toDay, clickDay, modalCalData } = useStore();
	const { month, day } = schedule;
	const days = [];
	const makeDay = (week: number) => {
		const result = [];
		// 첫 주
		if (week === 1) {
			// 주는 7일이니 7번씩 순회
			for (let i = 1; i <= 7; i += 1) {
				// 현재 첫 달의 요일 만큼 공백 채우기
				if (i <= firstDay) {
					result.push(<div key={i} className="w-[3rem] h-[3rem]" />);
				} else {
					// 1주차 달력 채우기 (빈칸 만큼 빼줘야 1부터 시작)
					const now = i - firstDay;
					const idx = transIdx(year, monthView, now);
					// 금일이 일하는 날인지 확인
					const workDay = day.includes(now) && monthView === month;
					result.push(
						<button
							type="button"
							onClick={() => {
								openModal();
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
			// 2주차 부터 달력 채우기
			const startDate = (week - 1) * 7;
			for (let i = startDate; i <= week * 7 - 1; i += 1) {
				// 현재 달 날짜
				if (i - firstDay < lastDate) {
					const now = i - firstDay + 1;
					const idx = transIdx(year, monthView, now);
					const workDay = day.includes(now) && monthView === month;
					result.push(
						<button
							type="button"
							onClick={() => {
								openModal();
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
