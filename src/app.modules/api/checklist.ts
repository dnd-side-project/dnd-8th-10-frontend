import { getCookie } from '../cookie';
import client from './client';

// 2023-02-07
// 입력 날짜에 해당하는 체크리스트 조회
export const getCheckList = async (date: string) => {
	const res = await client.get(`/api/checkList?date=${date}`);
	return res;
};

export interface PostCheckListBody {
	// TODO: 날짜 관련 정규화 알아보기
	date: string; // "2023-02-06"
	content: string;
	status: 'Y' | 'N';
}
// 할일 추가
export const postCheckList = async (body: PostCheckListBody) => {
	const res = await client.post(`/api/checkList`, { ...body });
	return res;
};

export interface PutCheckListBody {
	checkIdx: number; // 할일 목록 id
	content: string;
	status: 'Y' | 'N';
}
// 할일 항목 상태 업데이트
export const putCheckList = async (body: PutCheckListBody) => {
	const res = await client.put(`/api/checkList`, { ...body });
	return res;
};

// 할일 삭제
export const deleteCheckList = async (checkIdx: number) => {
	const res = await client.delete(`/api/checkList?checkIdx=${checkIdx}`);
	return res;
};
