import client from 'src/app.modules/api/client';

export interface DayBody {
	year: string;
	month: string;
	day?: string;
}
export interface MutateBody {
	year: string;
	month: string;
	day: string;
	time: string;
	workHour: number;
}

// 이 달의 출근 일 (캘린더 회색 표시)
export const getGray = async (body: DayBody) => {
	const res = await client.get('api/calendar', { params: { ...body } });
	return res;
};

// 출근하기
export const postWork = async (body: MutateBody) => {
	const res = await client.post('api/calendar', { ...body });
	return res;
};

// 출근 수정하기
export const putWorkModify = async (body: MutateBody) => {
	const res = await client.put('api/calendar', { ...body });
	return res;
};

// 출근 기록 삭제하기
export const delWorkModify = async (body: DayBody) => {
	const res = await client.delete('api/calendar', { params: { ...body } });
	return res;
};

// 과거 날짜 누른 경우
export const getWorkList = async (body: DayBody) => {
	const res = await client.get('/api/calendar/detail', { params: { ...body } });
	return res;
};

// 오늘 날짜를 누른 경우
export const getToDay = async (week: string) => {
	const res = await client.get(`api/calendar/${week}`);
	return res;
};
