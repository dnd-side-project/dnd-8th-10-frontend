import { RoleType } from 'src/app.modules/api/user';
import create from 'zustand';

export type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';
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
	role: RoleType;
	storeName: string;
	workTime: WorkTimeType;
	phoneNumber: string;
}

interface UserState {
	user: IUser;
	initUser: () => void;
	setType: (type: RoleType) => void;
	setStoreName: (storeName: string) => void;
	setTime: (workTime: WorkTimeType) => void;
	setPhoneNumber: (phoneNumber: string) => void;
}

const initUser: IUser = {
	role: 'WORKER',
	storeName: '',
	workTime: {} as WorkTimeType,
	phoneNumber: '',
};
const useRegisterUserStore = create<UserState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setType: (type: RoleType) => set((prev) => ({ user: { ...prev.user, type } })),
	setStoreName: (storeName: string) => set((prev) => ({ user: { ...prev.user, storeName } })),
	setTime: (workTime: WorkTimeType) => set((prev) => ({ user: { ...prev.user, workTime } })),
	setPhoneNumber: (phoneNumber: string) => set((prev) => ({ user: { ...prev.user, phoneNumber } })),
}));

export default useRegisterUserStore;
// value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime'
// [flag]: { ...prev.user[flag], [name]: value } }
