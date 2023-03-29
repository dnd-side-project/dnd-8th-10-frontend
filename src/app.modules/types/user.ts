export type RoleType = 'WORKER' | 'MANAGER';
export interface IUser {
	userName: string;
	userProfileCode: number;
	workPlace: string; // 'GS25 영통럭키점'
	workLocation: string;
	workTime: string; // '월(01:00~03:00),일(01:00~03:00)'
	role: RoleType;
	phoneNumber: string | null;
	wage: string;
	email: string;
}
