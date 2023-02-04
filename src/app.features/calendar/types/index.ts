export interface ISchedule {
	[x: string]: object | string;
}
export interface IUserInfo {
	name: string[];
}
export interface IMakeCal {
	year: number;
	month: number;
	firstDay: number;
	lastDate: number;
	schedule: ISchedule;
	toDay: string;
}
