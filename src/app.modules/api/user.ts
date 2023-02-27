import client from './client';

export const getUser = async () => {
	const res = await client.get(`/api/user`);
	return res;
};

export const getStoreInfo = async () => {
	const res = await client.get(`/api/store`);
	return res;
};

// TODO: api 나오면 맞게 수정
export type RoleType = 'WORKER' | 'MANAGER';
export interface MutateUserBody {
	role: RoleType;
	workPlace: string;
	workLocation: string;
	workTime: string; // "월(17:00~21:00),화(17:00~21:00)"
	phoneNumber: string; // "010-0000-0000"
	wage: number;
}

export const postUser = async (body: MutateUserBody) => {
	// TODO: client 헤더 설정 전체에 하기
	const res = await client.post(`/api/user/signup`, { ...body });
	return res;
};

export const putUser = async (body: MutateUserBody) => {
	const res = await client.put('/api/user/update', { ...body });
	return res;
};
