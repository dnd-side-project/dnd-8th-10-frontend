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
