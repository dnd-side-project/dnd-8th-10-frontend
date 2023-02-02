import { WEEK } from 'src/app.features/calendar/constants';

export const transIdx = (year: number, month: number, day: number) => {
	const transString = (year: number, month: number, day: number): string => {
		return year + '.' + month + '.' + day;
	};
	return transString(year, month + 1, day);
};

export const getDayOfWeek = (data: any) => {
	const dayOfWeek = WEEK[new Date(data).getDay()];
	return dayOfWeek;
};
