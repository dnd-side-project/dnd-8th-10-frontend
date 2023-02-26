import { WEEK_ENG } from 'src/app.features/calendar/constants';
import { IUser } from 'src/app.features/calendar/store/time';
import { Time } from 'src/app.features/calendar/types';

export const transIdx = (year: number, month: number, day: number) => {
	return `${year}.${month + 1}.${day}`;
};

export const getDayOfWeek = (data: string) => {
	const dayOfWeek = WEEK_ENG[new Date(data).getDay()];
	return dayOfWeek;
};

export function crossDate(clickDay: string, toDay: string) {
	const [currentYear, currentMonth, currentDay] = clickDay.split('.').map(Number);
	const [toDayYear, toDayMonth, toDayDay] = toDay.split('.').map(Number);
	const clickDayData = new Date(currentYear, currentMonth, currentDay, 0, 0, 0);
	const toDayData = new Date(toDayYear, toDayMonth, toDayDay, 0, 0, 0);
	return { clickDayData, toDayData };
}

export const getWorkTimeString = (startTime: Time, endTime: Time) => {
	try {
		return `${startTime.hour.length === 1 && startTime.meridiem === 'am' ? '0' : ''}${
			+startTime.hour + (startTime.meridiem === 'am' ? 0 : 12)
		}:${startTime.minute.length === 1 ? '0' : ''}${startTime.minute}~${
			endTime.hour.length === 1 && endTime.meridiem === 'am' ? '0' : ''
		}${+endTime.hour + (endTime.meridiem === 'am' ? 0 : 12)}:${endTime.minute.length === 1 ? '0' : ''}${
			endTime.minute
		}`;
	} catch (e) {
		console.log(e);
		return '';
	}
};
export const formatTimeView = (time: string, type = 'view') => {
	const [start, end] = time.split('~');
	const formatHour = (hour: number) => (hour % 12 === 0 ? 12 : hour % 12);
	const formatMinute = (minute: number) => minute.toString().padStart(2, '0');

	const [startHour, startMinute] = start.split(':').map((value) => parseInt(value, 10));
	const startMeridiem = startHour < 12 ? '오전' : '오후';
	const formattedStartHour = formatHour(startHour);
	const formattedStartMinute = formatMinute(startMinute);

	const [endHour, endMinute] = end.split(':').map((value) => parseInt(value, 10));
	const endMeridiem = endHour < 12 ? '오전' : '오후';
	const formattedEndHour = formatHour(endHour);
	const formattedEndMinute = formatMinute(endMinute);

	if (type === 'view') {
		return [
			`${startMeridiem} ${formattedStartHour}:${formattedStartMinute}`,
			`${endMeridiem} ${formattedEndHour}:${formattedEndMinute}`,
		];
	}
	return [
		`${startMeridiem} ${formattedStartHour} ${formattedStartMinute}`,
		`${endMeridiem} ${formattedEndHour} ${formattedEndMinute}`,
	];
};
export const parseSetWorkTime = (workTime: string): IUser => {
	const [meridiemLeft, hourLeft, minuteLeft] = formatTimeView(workTime, '')[0].split(' ');
	const [meridiemRight, hourRight, minuteRight] = formatTimeView(workTime, '')[1].split(' ');
	return {
		startTime: {
			meridiem: meridiemLeft === '오전' ? 'am' : 'pm',
			hour: hourLeft,
			minute: minuteLeft,
		},
		endTime: {
			meridiem: meridiemRight === '오전' ? 'am' : 'pm',
			hour: hourRight,
			minute: minuteRight,
		},
	};
};
