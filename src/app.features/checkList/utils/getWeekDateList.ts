import { getKoreaTodayDateInfo } from './getKoreaTodayDateInfo';

const getPrevMonthLastDayInfo = (curYear: number, curMonth: number) => {
	const lastDay = new Date(curYear, curMonth - 1, 0);
	const prevMonthLastDate = lastDay.getDate();
	const prevMonthLastDay = lastDay.getDay();
	return {
		prevMonthLastDate,
		prevMonthLastDay,
	};
};
const getCurMonthLastDayInfo = (curYear: number, curMonth: number) => {
	const lastDay = new Date(curYear, curMonth, 0);
	const curMonthLastDate = lastDay.getDate();
	return {
		curMonthLastDate,
	};
};

/**
 * 이번주 날짜 목록을 가져옴
 * @return ex1. 오늘이 11일 월요일이라면, [11,12,13,14,15,16,17] ex2. 오늘이 25일 월요일이라면(30일까지 있는 달), [25,26,27,28,29,30,1]
 */
export const getWeekDateList = (): number[] => {
	const { year, month, date, day } = getKoreaTodayDateInfo();
	const { curMonthLastDate } = getCurMonthLastDayInfo(year, month);
	const { prevMonthLastDate, prevMonthLastDay } = getPrevMonthLastDayInfo(year, month);

	const res = [];
	for (let i = 0; i < day; i += 1) {
		if (date - (day - i) <= 0) {
			res.push(prevMonthLastDate - (prevMonthLastDay - i));
		} else res.push(date - (day - i));
	}
	res.push(date);
	for (let i = 1; i < 7 - day; i += 1) {
		if (date + i > curMonthLastDate) {
			res.push(date + i - curMonthLastDate);
		} else res.push(date + i);
	}
	return res;
};
