import client from 'src/app.modules/api/client';

export interface DayBody {
	year: string;
	month: string;
	day?: string;
	timeCardId?: number;
}
export interface GrayBody {
	year: string;
	month: string;
}
export interface MutateBody {
	year: string;
	month: string;
	day: string;
	workTime: string;
	workHour: number;
	timeCardId?: number;
}
export interface SalaryBody {
	year: string;
	month: string;
	userCode?: number;
}

// 이 달의 출근 일 (캘린더 회색 표시)
export const getGray = async (body: GrayBody) => {
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
export const delWorkModify = async (timeCardId: number) => {
	const res = await client.delete('api/calendar', { params: { timeCardId } });
	return res;
};

// 과거 날짜 누른 경우
export const getWorkList = async (body: DayBody) => {
	const res = await client.get('/api/calendar/detail', { params: { ...body } });
	return res;
};

// 오늘 날짜를 누른 경우
export const getToDay = async (week: string) => {
	const res = await client.get(`api/calendar/week?week=${week}`);
	return res;
};

// 직원이 급여 정보 요청
export const getSalary = async (body: SalaryBody) => {
	const res = await client.get('api/calendar/salary/worker', { params: { ...body } });
	return res;
};

// 점장이 유저 리스트 정보 요청
export const getSalaryList = async (body: SalaryBody) => {
	const res = await client.get('api/calendar/salary/manager', { params: { ...body } });
	return res;
};

// 점장이 유저 급여 상세 정보 요청
export const getUserSalary = async (body: SalaryBody) => {
	const res = await client.get('api/calendar/salary/manager/detail', { params: { ...body } });
	return res;
};
