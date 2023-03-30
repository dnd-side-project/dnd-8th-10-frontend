import { IUser } from 'src/app.modules/types/user';
import { WeekWorkTimeType } from 'src/app.modules/types/workTime';
import create from 'zustand';

type UserFormType = Partial<IUser> & { workTimeObj?: WeekWorkTimeType }; // workTime -> 가공 전 상태

interface IState {
	userForm: UserFormType;
	initUserForm: () => void;
	setRole: (role: IUser['role']) => void;
	setWorkPlace: (workPlace: IUser['workPlace']) => void;
	setWorkLocation: (workLocation: IUser['workLocation']) => void;
	setTime: (workTimeObj: UserFormType['workTimeObj']) => void;
	setPhoneNumber: (phoneNumber: IUser['phoneNumber']) => void;
	setWage: (wage: IUser['wage']) => void;
}

const initUserForm: UserFormType = {};
// TODO: 이름 다시 짓기
export const INIT_WORKTIME = {} as WeekWorkTimeType;

const useRegisterUserStore = create<IState>((set) => ({
	userForm: initUserForm,
	initUserForm: () => set(() => ({ userForm: initUserForm })),
	setRole: (role) => set((prev) => ({ userForm: { ...prev.userForm, role } })),
	setWorkPlace: (workPlace) => set((prev) => ({ userForm: { ...prev.userForm, workPlace } })),
	setWorkLocation: (workLocation) => set((prev) => ({ userForm: { ...prev.userForm, workLocation } })),
	setTime: (workTimeObj) => set((prev) => ({ userForm: { ...prev.userForm, workTimeObj } })),
	setPhoneNumber: (phoneNumber) => set((prev) => ({ userForm: { ...prev.userForm, phoneNumber } })),
	setWage: (wage) => set((prev) => ({ userForm: { ...prev.userForm, wage } })),
}));

export default useRegisterUserStore;
