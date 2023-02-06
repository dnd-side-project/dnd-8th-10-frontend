/* export const MOCK_CIGARETTE_LIST: CigaretteType[] = [
	{
		name: '말보로 레드',
		diff: 3,
	},
	{
		name: '필라멘트 아쿠아5',
		diff: -3,
	},
	{
		name: '에쎄 클래식',
		diff: 0,
	},
	{
		name: '에쎄 프라임',
		diff: 1,
	},
	{
		name: '더원 체인지',
		diff: 0,
	},
	{
		name: '더원 오렌지',
		diff: 1,
	},
	{
		name: '레종 블루',
		diff: 5,
	},
	{
		name: '레종 프렌치블랙',
		diff: 0,
	},
	{
		name: '레종 블랙',
		diff: 0,
	},
	{
		name: '레종 요고',
		diff: 0,
	},
	{
		name: '레종 시즌',
		diff: 0,
	},
]; */
// TODO: MAP 순회 알아보기
export const MOCK_CIGARETTE_LIST = new Map<string, number>([
	['말보로 레드', 3],
	['필라멘트 아쿠아5', -3],
	['에쎄 클래식', 0],
	['에쎄 프라임', 1],
	['더원 체인지', 0],
	['더원 오렌지', 1],
	['레종 블루', 5],
	['레종 프렌치블랙', 0],
	['레종 블랙', 0],
	['레종 요고', 0],
	['레종 시즌', 0],
]);

export const MOCK_CIGARETTE_NAME_LIST = Array.from(MOCK_CIGARETTE_LIST.keys());
