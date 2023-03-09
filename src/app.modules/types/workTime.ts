export type TimeType = 'startTime' | 'endTime';

export const dayMap = new Map([
	['0', '월'],
	['1', '화'],
	['2', '수'],
	['3', '목'],
	['4', '금'],
	['5', '토'],
	['6', '일'],
]);
export const dayMapReverse = new Map([
	['월', '0'],
	['화', '1'],
	['수', '2'],
	['목', '3'],
	['금', '4'],
	['토', '5'],
	['일', '6'],
]);

export type DayType = '0' | '1' | '2' | '3' | '4' | '5' | '6';
export const mappedDay: { [key in DayType]: string } = {
	'0': '월',
	'1': '화',
	'2': '수',
	'3': '목',
	'4': '금',
	'5': '토',
	'6': '일',
};
export const mappedDayReverse = {
	월: '0',
	화: '1',
	수: '2',
	목: '3',
	금: '4',
	토: '5',
	일: '6',
};
export type TimeInfoType = {
	meridiem: 'am' | 'pm' | null;
	hour: string;
	minute: string;
};
export type WorkTimeType = {
	[day in DayType]: {
		startTime: {
			meridiem: 'am';
			hour: '1';
			minute: '0';
		};
		endTime: {
			meridiem: 'am';
			hour: '1';
			minute: '0';
		};
	};
};
