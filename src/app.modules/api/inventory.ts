import { IInventory } from 'src/app.features/inventory/types';
import client from './client';

export const getInventory = async (category: IInventory['category']) => {
	const res = await client.get(`/api/inventory?category=${category}`);
	return res;
};

export type PostCigaretteBodyType = Pick<IInventory, 'inventoryName'>;
// 새 담배이름 추가
export const postCigarette = async (body: PostCigaretteBodyType) => {
	const res = await client.post('/api/inventory', { ...body });
	return res;
};
export type diffRecord = Pick<IInventory, 'inventoryName'> & { diff: number };

export type PutInventoryBodyType = Pick<IInventory, 'category'> & { list: diffRecord[] };

export const putInventory = async (body: PutInventoryBodyType) => {
	const res = await client.put(`/api/inventory`, { ...body });
	return res;
};

// 시재 삭제 (for 담배 시재)
export const deleteInventory = async (inventoryIdx: IInventory['inventoryIdx']) => {
	const res = await client.delete(`/api/inventory?inventoryIdx=${inventoryIdx}`);
	return res;
};

// 모든 시재 기록 조회
export const getInventoryRecord = async (category: IInventory['category'] | 'ALL') => {
	const res = await client.get(`/api/inventory/record?${category !== 'ALL' ? `category=${category}` : ''}`);
	return res;
};

// 오늘 시재 기록 조회

export const getInventoryRecordToday = async () => {
	const res = await client.get(`/api/inventory/record/today`);
	return res;
};

// 시재 관리 가능한 시간대인지 확인
export const getIsWorkTime = async () => {
	const res = await client.get(`/api/inventory/workTime`);
	return res;
};
