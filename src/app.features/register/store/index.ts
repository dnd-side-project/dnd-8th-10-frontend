import { RoleType } from 'src/app.modules/api/user';
import create from 'zustand';

export const dayMap = new Map([
	['0', '월'],
	['1', '화'],
	['2', '수'],
	['3', '목'],
	['4', '금'],
	['5', '토'],
	['6', '일'],
]);
export type DayType = '0' | '1' | '2' | '3' | '4' | '5' | '6';
export type WorkTimeType = {
	[day in DayType]: {
		startTime: {
			meridiem: 'am';
			hour: '1';
			minute: '0';
		};
		endTime: {
			meridiem: 'am';
			hour: '1';
			minute: '0';
		};
	};
};
// TODO: 백엔드 용어랑 통일시키기
interface IUser {
	role: RoleType | null;
	workPlace: string | null;
	workLocation: string | null;
	workTime: WorkTimeType;
	phoneNumber: string | null;
}

interface UserState {
	user: IUser;
	initUser: () => void;
	setRole: (role: RoleType) => void;
	setWorkPlace: (workPlace: string | null) => void;
	setWorkLocation: (workLocation: string | null) => void;
	setTime: (workTime: WorkTimeType) => void;
	setPhoneNumber: (phoneNumber: string | null) => void;
}

const initUser: IUser = {
	role: null,
	workPlace: null,
	workLocation: null,
	workTime: {} as WorkTimeType,
	phoneNumber: null,
};
// TODO: 이름 다시 짓기
export const INIT_WORKTIME = {} as WorkTimeType;

const useRegisterUserStore = create<UserState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setRole: (role: RoleType) => set((prev) => ({ user: { ...prev.user, role } })),
	setWorkPlace: (workPlace: string | null) => set((prev) => ({ user: { ...prev.user, workPlace } })),
	setWorkLocation: (workLocation: string | null) => set((prev) => ({ user: { ...prev.user, workLocation } })),
	setTime: (workTime: WorkTimeType) => set((prev) => ({ user: { ...prev.user, workTime } })),
	setPhoneNumber: (phoneNumber: string | null) => set((prev) => ({ user: { ...prev.user, phoneNumber } })),
}));

export default useRegisterUserStore;
// value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime'
// [flag]: { ...prev.user[flag], [name]: value } }
