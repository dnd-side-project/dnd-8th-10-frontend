import { dayMap, DayType, TimeInfoType, WorkTimeType } from '../types/workTime';

const timeFormatter = (timeObj: TimeInfoType) => {
	const { meridiem, hour, minute } = timeObj;
	// eslint-disable-next-line no-nested-ternary
	let resHour: string = meridiem === 'am' ? (+hour < 10 ? `0${+hour}` : hour) : `${+hour + 12}`;
	if (+resHour % 12 === 0) {
		if (meridiem === 'am') resHour = '24';
		else resHour = '12';
	}
	const resMinute: string = +minute < 10 ? `0${+minute}` : minute;
	return `${resHour}:${resMinute}`;
};

export const getUserWorkTimeString = (workTime: WorkTimeType) => {
	try {
		return Object.entries(workTime)
			.sort(([a], [b]) => (a < b ? -1 : 1))
			.map(([day, time]) => {
				const { startTime, endTime } = time;
				return `${dayMap.get(day)}(${timeFormatter(startTime)}~${timeFormatter(endTime)})`;
			})
			.toString();
	} catch (e) {
		// 입력이 비어있는 경우,에러 발생시 필수정보를 모두 입력해주세요 모달이 뜨게 처리됨
		console.log(e);
		return '';
	}
};

/*
export type TimeInfoType = {
	meridiem: 'am' | 'pm';
	hour: string;
	minute: string;
};
*/

/**
 * 근무시간  함수 포맷함수(for calendar)
 * @param startTime 출근시간 TimeInfoType
 * @param endTime 퇴근시간 TimeInfoType
 * @return 02:15~12:05 형식
 */
export const getWorkTimeString = (startTime: TimeInfoType, endTime: TimeInfoType) => {
	return `${timeFormatter(startTime)}~${timeFormatter(endTime)}`;
};
