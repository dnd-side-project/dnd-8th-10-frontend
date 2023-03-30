// 월,화,수,목,금,토,일 순서로 정렬을 위해 일요일을 6으로 표기. js Date 객체와 관련 없음
export type DayNumType = '0' | '1' | '2' | '3' | '4' | '5' | '6';
export type DayTextType = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export const dayMap = new Map<DayNumType, DayTextType>([
	['0', '월'],
	['1', '화'],
	['2', '수'],
	['3', '목'],
	['4', '금'],
	['5', '토'],
	['6', '일'],
]);
export const dayMapReverse = new Map<DayTextType, DayNumType>([
	['월', '0'],
	['화', '1'],
	['수', '2'],
	['목', '3'],
	['금', '4'],
	['토', '5'],
	['일', '6'],
]);

export type WorkTimeInfoType = {
	meridiem: 'am' | 'pm' | null; // TODO: null 타입 지우기
	hour: string;
	minute: string;
};
export type CommuteType = 'startTime' | 'endTime';
export type WeekWorkTimeType = {
	[day in DayNumType]: {
		[time in CommuteType]: WorkTimeInfoType;
	};
};
export type WorkTimeOnModalType = {
	meridiem: WorkTimeInfoType['meridiem'] | null;
	hour: WorkTimeInfoType['hour'] | null;
	minute: WorkTimeInfoType['minute'] | null;
};
