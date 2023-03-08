import create from 'zustand';

// TODO: 백엔드 용어랑 통일시키기
export interface IUser {
	startTime: {
		meridiem: 'am' | 'pm' | null;
		hour: string;
		minute: string;
	};
	endTime: {
		meridiem: 'am' | 'pm' | null;
		hour: string;
		minute: string;
	};
}

interface UserState {
	user: IUser;
	initUser: () => void;
	setTime: (value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime') => void;
	setInitTime: (newUser: IUser) => void;
	setStartTime: () => void;
	setEndTime: () => void;
}
const initUser: IUser = {
	startTime: {
		meridiem: null,
		hour: '',
		minute: '',
	},
	endTime: {
		meridiem: null,
		hour: '',
		minute: '',
	},
};
const useTimeSetStore = create<UserState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setTime: (value: string, name: 'meridiem' | 'hour' | 'minute', flag: 'startTime' | 'endTime') =>
		set((prev) => ({ user: { ...prev.user, [flag]: { ...prev.user[flag], [name]: value } } })),
	setInitTime: (newUser: IUser) => set(() => ({ user: newUser })),
	setStartTime: () =>
		set((prev) => ({
			user: { ...prev.user, startTime: { ...prev.user.endTime, meridiem: null, hour: '', minute: '' } },
		})),
	setEndTime: () =>
		set((prev) => ({
			user: { ...prev.user, endTime: { ...prev.user.startTime, meridiem: null, hour: '', minute: '' } },
		})),
}));

export default useTimeSetStore;
