import { WEEK } from 'src/app.features/calendar/constants';

export const transIdx = (year: number, month: number, day: number) => {
	return `${year}.${month + 1}.${day}`;
};

export const getDayOfWeek = (data: any) => {
	const dayOfWeek = WEEK[new Date(data).getDay()];
	return dayOfWeek;
};

export const getScheduleMatch = (schedule: any, idx: any) => {
	const arr: string[] = [];
	Object.keys(schedule).forEach((key) => {
		const data = Object.keys(schedule[key]);
		for (let i = 0; i < data.length; i += 1) {
			if (data[i] === getDayOfWeek(idx)) {
				arr.push(key);
			}
		}
	});
	return arr;
};
