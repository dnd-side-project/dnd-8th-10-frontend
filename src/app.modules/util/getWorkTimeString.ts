import { dayMap, WorkTimeType } from '../types/workTime';

export const getWorkTimeString = (workTime: WorkTimeType) => {
	try {
		return Object.entries(workTime)
			.sort(([a], [b]) => (a < b ? -1 : 1))
			.map(([day, time]) => {
				const { startTime, endTime } = time;
				console.log(endTime.meridiem);
				// TODO: 코드 이뿌게고치기
				return `${dayMap.get(day)}(${startTime.hour.length === 1 && startTime.meridiem === 'am' ? '0' : ''}${
					+startTime.hour + (startTime.meridiem === 'am' ? 0 : 12)
				}:${startTime.minute.length === 1 ? '0' : ''}${startTime.minute}~${
					endTime.hour.length === 1 && endTime.meridiem === 'am' ? '0' : ''
				}${+endTime.hour + (endTime.meridiem === 'am' ? 0 : 12)}:${endTime.minute.length === 1 ? '0' : ''}${
					endTime.minute
				})`;
			})
			.toString();
	} catch (e) {
		console.log(e);
		return '';
	}
};
