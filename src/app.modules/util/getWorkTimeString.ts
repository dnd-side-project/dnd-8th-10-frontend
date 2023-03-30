import { dayMap, DayNumType, TimeInfoType, WeekWorkTimeType } from '../types/workTime';

const timeFormatter = (timeObj: TimeInfoType): string => {
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
/**
 * 월(02:15~12:05),화(02:15~12:05) 형식으로 유저 정보에 등록된 주 전체 근무시간 정의
 * @param workTime 요일별 근무시간 WeekWorkTimeType
 * @return 월(02:15~11:05),화(02:15~10:05) 형식
 */
export const getUserWeekWorkTimeString = (workTime: WeekWorkTimeType): string => {
	try {
		return Object.entries(workTime)
			.sort(([a], [b]) => (a < b ? -1 : 1))
			.map(([day, time]) => {
				const { startTime, endTime } = time;
				return `${dayMap.get(day as DayNumType)}(${timeFormatter(startTime)}~${timeFormatter(endTime)})`;
			})
			.toString();
	} catch (e) {
		// 입력이 비어있는 경우,에러 발생시 필수정보를 모두 입력해주세요 모달이 뜨게 처리됨
		return '';
	}
};

/**
 * 근무시간  함수 포맷함수(for calendar)
 * @param startTime 출근시간 TimeInfoType
 * @param endTime 퇴근시간 TimeInfoType
 * @return 02:15~12:05 형식
 */
export const getWorkTimeString = (startTime: TimeInfoType, endTime: TimeInfoType): string => {
	return `${timeFormatter(startTime)}~${timeFormatter(endTime)}`;
};
