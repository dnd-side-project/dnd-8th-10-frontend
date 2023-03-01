import client from './client';

export type Category = 'CIGARETTE' | 'GIFTCARD' | 'GARBAGEBAG';
// 시재 조회
export interface IInventoryList {
	inventoryIdx: number;
	inventoryName: string;
	category: string;
	inventoryCount: number;
	diff?: number;
}
export const getInventory = async (category: Category) => {
	const res = await client.get(`/api/inventory?category=${category}`);
	return res;
};

export interface PostCigaretteBody {
	inventoryName: string;
}
// 새 담배이름 추가
export const postCigarette = async (body: PostCigaretteBody) => {
	const res = await client.post('/api/inventory', { ...body });
	return res;
};
export type diffRecord = {
	inventoryName: PostCigaretteBody['inventoryName'];
	diff: number;
};
export interface PutInventoryBody {
	category: string; // TODO: 타입주기
	list: diffRecord[];
}
export const putInventory = async (body: PutInventoryBody) => {
	const res = await client.put(`/api/inventory`, { ...body });
	return res;
};

export interface IInventoryHistory {
	userName: string;
	workDay: string; // 2월14일
	workTime: string; // 18:00~23:00
	userProfileCode: number;
	list: Partial<IInventoryList>[]; // inventoryName,diff,category
	inventorySummumation?: string;
}
// 모든 시재 기록 조회
export const getInventoryRecord = async (category: Category | 'ALL') => {
	console.log(category, 'caategor');
	const res = await client.get(`/api/inventory/record?${category !== 'ALL' ? `category=${category}` : ''}`);
	return res;
};

// 오늘 시재 기록 조회

export const getInventoryRecordToday = async () => {
	const res = await client.get(`/api/inventory/record/today`);
	return res;
};
