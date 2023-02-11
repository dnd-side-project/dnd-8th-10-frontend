import client from './client';

// 담배시재 조회
export const getCigaretteInventory = async () => {
	const res = await client.get(`/api/inventory?category=CIGARETTE`);
	return res;
};
