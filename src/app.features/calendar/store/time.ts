import { RoleType } from 'src/app.modules/api/user';
import create from 'zustand';

// TODO: 백엔드 용어랑 통일시키기
interface IUser {
	startTime: {
		meridiem: 'am' | 'pm';
		hour: string;
		minute: string;
	};
	endTime: {
		meridiem: 'am' | 'pm';
		hour: string;
		minute: string;
	};
}

interface UserState {
	user: IUser;
	initUser: () => void;
	setTime: (value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime') => void;
}
const initUser: IUser = {
	startTime: {
		meridiem: 'am',
		hour: '1',
		minute: '0',
	},
	endTime: {
		meridiem: 'am',
		hour: '1',
		minute: '0',
	},
};
const useTimeSetStore = create<UserState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setStoreName: (storeName: string) => set((prev) => ({ user: { ...prev.user, storeName } })),
	setTime: (value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime') =>
		set((prev) => ({ user: { ...prev.user, [flag]: { ...prev.user[flag], [name]: value } } })),
}));

export default useTimeSetStore;
