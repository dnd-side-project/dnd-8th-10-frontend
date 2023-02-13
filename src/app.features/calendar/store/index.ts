import { transIdx } from 'src/app.modules/util/calendar';
import create from 'zustand';

interface IStore {
	year: number;
	month: number;
	isOpen: boolean;
	clickDay: string;
	toDay: string;
	workDay: boolean;
	modalIsOpen: (clickDay: string, workDay: boolean) => void;
	modalIsClose: () => void;
	isDayReset: () => void;
	setCalendar: (year: number, month: number) => void;
}
const today = new Date();
const useStore = create<IStore>((set) => ({
	year: today.getFullYear(),
	month: today.getMonth(),
	isOpen: false,
	clickDay: '',
	toDay: transIdx(today.getFullYear(), today.getMonth(), today.getDate()),
	workDay: false,
	modalIsOpen: (clickDay, workDay) => set(() => ({ isOpen: true, clickDay, workDay })),
	modalIsClose: () => set(() => ({ isOpen: false })),
	isDayReset: () => set(() => ({ clickDay: '' })),
	setCalendar: (year, month) => set(() => ({ year, month })),
}));

export default useStore;
