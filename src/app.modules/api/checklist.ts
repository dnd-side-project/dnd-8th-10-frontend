import { ICheckList } from 'src/app.features/checkList/\btypes';
import client from './client';

// 2023-02-07
// 입력 날짜에 해당하는 체크리스트 조회
export const getCheckList = async (date: ICheckList['date']) => {
	const res = await client.get(`/api/checkList?date=${date}`);
	return res;
};

export const getWeekState = async () => {
	const res = await client.get(`/api/checkList/week`);
	return res;
};

export type PostCheckListBodyType = Pick<ICheckList, 'date' | 'content' | 'status'>;
// 할일 추가
export const postCheckList = async (body: PostCheckListBodyType) => {
	const res = await client.post(`/api/checkList`, { ...body });
	return res;
};

export type PutCheckListBodyType = Pick<ICheckList, 'checkIdx' | 'content' | 'status'>;

// 할일 항목 상태 업데이트
export const putCheckList = async (body: PutCheckListBodyType) => {
	const res = await client.put(`/api/checkList`, { ...body });
	return res;
};

// 할일 삭제
export const deleteCheckList = async (checkIdx: ICheckList['checkIdx']) => {
	const res = await client.delete(`/api/checkList?check=${checkIdx}`);
	return res;
};
