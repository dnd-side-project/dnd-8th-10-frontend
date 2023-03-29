import { getCookie } from 'src/app.modules/cookie';
import { IUser } from 'src/app.modules/types/user';

import create from 'zustand';

interface IState {
	localUser: IUser | null;
	initUser: () => void;
	updateUser: (user: IUser) => void;
}

const emptyUser = null;

const useLocalUserStore = create<IState>((set) => ({
	localUser: emptyUser,
	initUser: () =>
		set(() => {
			const cookieUser = getCookie('USER');
			if (!cookieUser) return { localUser: emptyUser };
			return { localUser: cookieUser };
		}),
	updateUser: (updatedLocalUser: IUser) =>
		set({
			localUser: updatedLocalUser,
		}),
}));

export default useLocalUserStore;
