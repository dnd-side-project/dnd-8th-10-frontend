export interface ICheckList {
	date: string; // '2023-02-09' 	// TODO: 날짜 관련 정규화 알아보기
	checkIdx: number;
	content: string;
	status: 'Y' | 'N';
}
