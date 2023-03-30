export const getFormmatedWorkTime = (partTime: string): string => {
	const day = partTime[0];
	const [startTime, endTime] = partTime.slice(2, -1).split('~');
	const [startTimeHour, startTimeMinute] = startTime.split(':');
	const [endTimeHour, endTimeMinute] = endTime.split(':');
	const getMeridem = (hour: string) => (+hour < 12 || +hour >= 24 ? '오전' : '오후');

	return `${day}(${getMeridem(startTimeHour)} ${
		+startTimeHour % 12 === 0 ? 12 : +startTimeHour % 12
	}:${startTimeMinute} - ${getMeridem(endTimeHour)}${
		+endTimeHour % 12 === 0 ? 12 : +endTimeHour % 12
	}:${endTimeMinute})`;
};
