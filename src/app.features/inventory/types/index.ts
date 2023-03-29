import { IUser } from 'src/app.modules/types/user';

export type CountHistoryType = { [name: string]: number };

export type InventoryCategory = 'CIGARETTE' | 'GIFTCARD' | 'GARBAGEBAG';
export type InvetoryFilterType = '전체' | '담배' | '쓰레기 봉투' | '문화 상품권';

// 시재
export interface IInventory {
	inventoryIdx: number;
	inventoryName: string;
	category: InventoryCategory;
	inventoryCount: number;
	diff?: number;
}

// 시재 히스토리
export type InventoryHistoryType = Pick<IUser, 'userName' | 'workTime' | 'userProfileCode'> & {
	workDay: string; // 2월14일
	list: Pick<IInventory, 'inventoryName' | 'diff' | 'category'>[]; // inventoryName,diff,category
	inventorySummumation?: string;
};

export const mappedInventoryFilter: { [k in InvetoryFilterType]: 'ALL' | InventoryCategory } = {
	전체: 'ALL',
	담배: 'CIGARETTE',
	'쓰레기 봉투': 'GARBAGEBAG',
	'문화 상품권': 'GIFTCARD',
};
