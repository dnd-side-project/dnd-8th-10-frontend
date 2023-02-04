export interface IDumy {
	year: number;
	month: number;
	schedule: { [x: string]: object | string };
}
export interface IUserInfo {
	name: string[];
}
export interface IMakeCal {
	year: number;
	month: number;
	firstDay: number;
	lastDate: number;
	schedule: { [x: string]: object | string };
	toDay: string;
}