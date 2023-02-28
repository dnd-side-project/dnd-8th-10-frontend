import { WEEK_ENG } from 'src/app.features/calendar/constants';
import { IUser } from 'src/app.features/calendar/store/time';

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

export const setWorkTimeReset = (workTime: string, start = false): IUser => {
	if (start) {
		const [meridiemRight, hourRight, minuteRight] = formatTimeView(workTime, '')[1].split(' ');
		return {
			startTime: {
				meridiem: 'am',
				hour: '0',
				minute: '0',
			},
			endTime: {
				meridiem: meridiemRight === '오전' ? 'am' : 'pm',
				hour: hourRight,
				minute: minuteRight,
			},
		};
	}
	const [meridiemLeft, hourLeft, minuteLeft] = formatTimeView(workTime, '')[0].split(' ');
	return {
		startTime: {
			meridiem: meridiemLeft === '오전' ? 'am' : 'pm',
			hour: hourLeft,
			minute: minuteLeft,
		},
		endTime: {
			meridiem: 'am',
			hour: '0',
			minute: '0',
		},
	};
};

export const timeSplit = (time: string[]) => {
	const startSplit = Number(time[0].split(':')[0]) * 60 + Number(time[0].split(':')[1]);
	const endSplit = Number(time[1].split(':')[0]) * 60 + Number(time[1].split(':')[1]);
	return [startSplit, endSplit];
};

export const homeTimeView = (timeStr: string) => {
	let [hour, minute] = timeStr.split(':').map(Number);
	let result = '';
	if (hour < 12) {
		result = '오전 ' + hour + '시';
	} else if (hour === 12) {
		result = '오후 ' + hour + '시';
	} else {
		hour -= 12;
		result = '오후 ' + hour + '시';
	}
	if (minute > 0) {
		result += ' ' + minute + '분';
	}
	return result;
};
