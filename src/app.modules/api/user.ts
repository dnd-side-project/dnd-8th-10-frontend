import { IUser, RoleType } from '../types/user';
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

export type MutateUserBodyType = Pick<
	IUser,
	'role' | 'workPlace' | 'workLocation' | 'workTime' | 'phoneNumber' | 'wage'
>;

export const postUser = async (body: MutateUserBodyType) => {
	// TODO: client 헤더 설정 전체에 하기
	const res = await client.post(`/api/user/signup`, { ...body });
	return res;
};

export const putUser = async (body: MutateUserBodyType) => {
	const res = await client.put('/api/user/update', { ...body });
	return res;
};

export const deleteUser = async () => {
	const res = await client.delete('/api/user');
	return res;
};

export const getUserPost = async () => {
	const res = await client.get('/api/myPost');
	return res;
};
