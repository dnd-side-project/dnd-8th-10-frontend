export type CountHistoryType = { [name: string]: number };

export type InventoryType = '전체' | '담배' | '쓰레기 봉투' | '문화 상품권';

export const mappedFilter: { [k in InventoryType]: string } = {
	전체: 'ALL',
	담배: 'CIGARETTE',
	'쓰레기 봉투': 'GARBAGEBAG',
	'문화 상품권': 'GIFTCARD',
};
