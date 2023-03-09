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

export const formatTimeView = (time: string, type = 'reset') => {
	const [start, end] = time.split('~');
	let formatHour;
	if (type === 'reset') {
		formatHour = (hour: number) => hour % 12;
	} else {
		formatHour = (hour: number) => (hour % 12 === 0 ? 12 : hour % 12);
	}

	const formatMinute = (minute: number) => minute.toString().padStart(2, '0');

	const [startHour, startMinute] = start.split(':').map((value) => parseInt(value, 10));
	let startMeridiem;
	if (startHour === 24) {
		startMeridiem = '오전';
	} else {
		startMeridiem = startHour < 12 ? '오전' : '오후';
	}
	const formattedStartHour = formatHour(startHour);
	const formattedStartMinute = formatMinute(startMinute);
	const [endHour, endMinute] = end.split(':').map((value) => parseInt(value, 10));
	let endMeridiem;
	if (endHour === 24) {
		endMeridiem = '오전';
	} else {
		endMeridiem = endHour < 12 ? '오전' : '오후';
	}
	const formattedEndHour = formatHour(endHour);
	const formattedEndMinute = formatMinute(endMinute);
	return [
		`${startMeridiem} ${formattedStartHour} ${formattedStartMinute}`,
		`${endMeridiem} ${formattedEndHour} ${formattedEndMinute}`,
	];
};

export const parseSetWorkTime = (workTime: string): IUser => {
	const [meridiemLeft, hourLeft, minuteLeft] = formatTimeView(workTime, '')[0].split(' ');
	const [meridiemRight, hourRight, minuteRight] = formatTimeView(workTime, '')[1].split(' ');
	console.log();
	return {
		startTime: {
			meridiem: meridiemLeft === '오전' ? 'am' : 'pm',
			hour: hourLeft,
			minute: minuteLeft === '00' ? '0' : minuteLeft,
		},
		endTime: {
			meridiem: meridiemRight === '오전' ? 'am' : 'pm',
			hour: hourRight,
			minute: minuteRight === '00' ? '0' : minuteRight,
		},
	};
};

export const setWorkTimeReset = (workTime: string, start = false): IUser => {
	if (start) {
		const [meridiemRight, hourRight, minuteRight] = formatTimeView(workTime)[1].split(' ');
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
	const [meridiemLeft, hourLeft, minuteLeft] = formatTimeView(workTime)[0].split(' ');
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

export const homeTimeView = (timeStr: string, type = 'home') => {
	const timeSplits = timeStr.split(':').map(Number);
	let hour = timeSplits[0];
	const minute = timeSplits[1];
	let result = '';
	if (hour === 24) {
		result = `${type === 'home' ? `오전 12시` : `12시`}`;
	} else if (hour < 12) {
		result = `${type === 'home' ? `오전 ${hour}시` : `${hour}시`}`;
	} else if (hour === 12) {
		result = `${type === 'home' ? `오후 ${hour}시` : `${hour}시`}`;
	} else {
		hour -= 12;
		result = `${type === 'home' ? `오후 ${hour}시` : `${hour}시`}`;
	}
	if (minute > 0) {
		result += `${minute}분`;
	}
	return result;
};

export const WorkListTimeView = (time: string) => {
	const [hour, minute] = time.split(':');
	if (time === '24:00') {
		return '오전 12:00';
	}
	if (time === '12:00') {
		return '오후 12:00';
	}
	if (hour >= '12') {
		return `${hour}` === '12'
			? `오전 ${hour}:${minute}`
			: `오후 ${String(Number(hour) - 12).padStart(2, '0')}:${minute}`;
	}
	return `오전 ${hour}:${minute}`;
};

export const getLastTime = (time: string[]) => {
	return time.sort((a, b) => {
		const [aHour, aMinute] = a.split(':').map(Number);
		const [bHour, bMinute] = b.split(':').map(Number);
		if (aHour < bHour) {
			return 1;
		}
		if (aHour > bHour) {
			return -1;
		}
		if (aMinute < bMinute) {
			return 1;
		}
		if (aMinute > bMinute) {
			return -1;
		}
		return 0;
	})[0];
};

export const getFirstTime = (time: string[]) => {
	return time.sort((a, b) => {
		const [aHour, aMinute] = a.split(':').map(Number);
		const [bHour, bMinute] = b.split(':').map(Number);
		if (aHour < bHour) {
			return -1;
		}
		if (aHour > bHour) {
			return 1;
		}
		if (aMinute < bMinute) {
			return -1;
		}
		if (aMinute > bMinute) {
			return 1;
		}
		return 0;
	})[0];
};

export const viewTimeFormat = (time: Time) => {
	if (time.meridiem === null && time.hour === '' && time.minute === '') {
		return '시간 입력';
	}
	let merdiem = '';
	if (time.meridiem === 'am') {
		merdiem = '오전';
	}
	if (time.meridiem === 'pm') {
		merdiem = '오후';
	}
	const hour = time.hour.padStart(2, '0');
	const minute = time.minute ? `${time.minute.padStart(2, '0')}분` : '';
	return `${merdiem} ${hour}시 ${minute}`;
};

export const workTimeDuplication = (workTime: string, startTime: string, endTime: string) => {
	const [start, end] = workTime.split('~');
	const minTime = new Date(`2023-01-01T${startTime}`);
	const maxTime = new Date(`2023-01-01T${endTime}`);
	const workStartTime = new Date(`2023-01-01T${start}`);
	const workEndTime = new Date(`2023-01-01T${end}`);
	if (start === startTime && end === endTime) {
		return true;
	}
	const innerTime = minTime <= workStartTime && maxTime >= workEndTime;
	const outTime = minTime >= workStartTime && maxTime <= workEndTime;
	return innerTime || outTime;
};
