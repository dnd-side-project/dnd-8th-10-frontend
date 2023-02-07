import client from 'src/app.modules/api/client';

export interface MutateBody {
	year: string;
	month: string;
	day: string;
	time: string;
	workHour: number;
}

// 출근했던 날짜 회색
export const getGray = async () => {
	const res = await client.get(`/`);
	return res;
};

// 출근하기
export const postWork = async (body: MutateBody) => {
	const res = await client.post(`/`, { ...body });
	return res;
};

// 출근 수정하기
export const putWorkModify = async (body: MutateBody) => {
	const res = await client.put(`/`, { ...body });
	return res;
};

// 오늘이외 날짜 누른 경우 (ex 이전날)
export const getYesterDay = async () => {
	const res = await client.get('/yesterday');
	return res;
};

// 오늘 날짜를 누른 경우
export const getToDay = async (week: string) => {
	const res = await client.get(`/today/${week}`);
	return res;
};
