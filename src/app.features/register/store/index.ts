import { UserType } from 'src/app.modules/api/user';
import create from 'zustand';

interface IUser {
	type: UserType;
	storeName: string;
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
	phoneNumber: string;
}

interface UserState {
	user: IUser;
	initUser: () => void;
	setType: (type: UserType) => void;
	setStoreName: (storeName: string) => void;
	setTime: (value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime') => void;
	setPhoneNumber: (phoneNumber: string) => void;
}
const initUser: IUser = {
	type: 'employee',
	storeName: '',
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
	phoneNumber: '',
};
const useRegisterUserStore = create<UserState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setType: (type: UserType) => set((prev) => ({ user: { ...prev.user, type } })),
	setStoreName: (storeName: string) => set((prev) => ({ user: { ...prev.user, storeName } })),
	setTime: (value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime') =>
		set((prev) => ({ user: { ...prev.user, [flag]: { ...prev.user[flag], [name]: value } } })),
	setPhoneNumber: (phoneNumber: string) => set((prev) => ({ user: { ...prev.user, phoneNumber } })),
}));

export default useRegisterUserStore;
