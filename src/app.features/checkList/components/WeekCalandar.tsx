import React from 'react';
import { formatDate } from 'src/app.modules/util/formatDate';
import { TODAY_STRING } from '../constants/todayString';
import { getKoreaTodayDateInfo } from '../utils/getKoreaTodayDateInfo';
import { getWeekDateList } from '../utils/getWeekDateList';

interface Props {
	weekState: boolean[];
	searchDate: string;
	onSearchDateChange: (formattedSearchDate: string) => void;
}
function WeekCalandar({ weekState, searchDate, onSearchDateChange }: Props) {
	const { year, month, date, day } = getKoreaTodayDateInfo();
	const getSearchDateString = (weekIdx: number, selectedDate: number) => {
		const todayWeekIdx = day;
		let selectedMonth = month;
		let selectedYear = year;
		if (selectedDate < date && todayWeekIdx < weekIdx) {
			// 다음달로 넘어가는 경우
			if (month === 12) {
				selectedMonth = 1;
				selectedYear += 1;
			} else {
				selectedMonth += 1;
			}
		}
		if (selectedDate > date && todayWeekIdx > weekIdx) {
			// 이전달로 넘어가는 경우
			if (month === 1) {
				selectedMonth = 12;
				selectedYear -= 1;
			} else {
				selectedMonth -= 1;
			}
		}
		return formatDate(selectedYear, selectedMonth, selectedDate);
	};
	const getDateTitle = () => {
		const [resYear, resMonth] = searchDate.split('-');
		return `${+resYear}년 ${+resMonth}월`;
	};
	const getDateButtonStyle = (weekIdx: number, selectedDate: number) => {
		const todayStyle =
			TODAY_STRING === getSearchDateString(weekIdx, selectedDate) ? 'border-[0.15rem] border-primary' : '';

		if (weekState && weekState[weekIdx]) return `bg-primarySub text-primary ${todayStyle}`;
		return '';
	};
	const setSearchDateHandler = (weekIdx: number, selectedDate: number): void => {
		onSearchDateChange(getSearchDateString(weekIdx, selectedDate));
	};

	return (
		<div className="space-y-[2rem] px-[2rem] pb-[1.2rem]  bg-w ">
			<span className="text-g10 text-subhead4">{getDateTitle()}</span>
			<div className="text-g8 space-y-[1.6rem]">
				<ul className="grid grid-cols-7 text-g10 text-center text-body1 ">
					{['일', '월', '화', '수', '목', '금', '토'].map((w) => (
						<li key={w} className="first:text-g7  last:text-g7">
							{w}
						</li>
					))}
				</ul>
				<ul className="grid grid-cols-7 text-center  ">
					{getWeekDateList().map((w, index) => (
						<li key={index} className="first:text-g7 text-g10 last:text-g7">
							<button
								name="searchDate"
								value={w}
								onClick={() => setSearchDateHandler(index, w)}
								aria-pressed={+searchDate.split('-')[2] === +w}
								className={`aria-pressed:bg-primary aria-pressed:text-w ${getDateButtonStyle(
									index,
									w
								)}  w-[3.4rem] h-[3.4rem] font-[400] leading-[100%] text-center rounded-[0.8rem]`}
							>
								<span className=" text-[1.4rem] ">{w}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default WeekCalandar;
