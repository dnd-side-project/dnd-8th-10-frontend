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

export const getScheduleMatch = (schedule: any, idx: any) => {
	const arr = [];
	for (let key in schedule) {
		const data = Object.keys(schedule[key]);
		for (let i = 0; i < data.length; i += 1) {
			const filter = data[i] === getDayOfWeek(idx);
			if (filter) {
				arr.push(key);
			}
		}
	}
	return arr;
};
