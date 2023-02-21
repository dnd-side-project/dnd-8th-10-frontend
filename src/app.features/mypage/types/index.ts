import { RoleType } from 'src/app.modules/api/user';

export interface IUser {
	userName: string;
	userProfileCode: number;
	workPlace: string; // 'GS25 영통럭키점'
	workTime: string; // '월(01:00~03:00),일(01:00~03:00)'
	role: RoleType;
	phoneNumber: string;
}
