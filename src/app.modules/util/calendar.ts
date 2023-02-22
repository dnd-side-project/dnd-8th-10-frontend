import { WEEK_ENG } from 'src/app.features/calendar/constants';

export const transIdx = (year: number, month: number, day: number) => {
	return `${year}.${month + 1}.${day}`;
};

export const getDayOfWeek = (data: string) => {
	const dayOfWeek = WEEK_ENG[new Date(data).getDay()];
	return dayOfWeek;
};

export function getDaysInMonth(year: number, month: number) {
	const day = new Date(year, month + 1, 0).getDate();
	return `${month + 1}.1 - ${month + 1}.${day}`;
}

export function crossDate(clickDay: string, toDay: string) {
	const [currentYear, currentMonth, currentDay] = clickDay.split('.').map(Number);
	const [toDayYear, toDayMonth, toDayDay] = toDay.split('.').map(Number);
	const clickDayData = new Date(currentYear, currentMonth, currentDay, 0, 0, 0);
	const toDayData = new Date(toDayYear, toDayMonth, toDayDay, 0, 0, 0);
	return { clickDayData, toDayData };
}
