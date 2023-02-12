import { transIdx } from 'src/app.modules/util/calendar';
import create from 'zustand';

interface IStore {
	year: number;
	month: number;
	isOpen: boolean;
	isDay: string;
	toDay: string;
	workDay: boolean;
	modalIsOpen: (isDay: string, workDay: boolean) => void;
	modalIsClose: () => void;
	isDayReset: () => void;
	setCalendar: (year: number, month: number) => void;
}
const today = new Date();
const useStore = create<IStore>((set) => ({
	year: today.getFullYear(),
	month: today.getMonth(),
	isOpen: false,
	isDay: '',
	toDay: transIdx(today.getFullYear(), today.getMonth(), today.getDate()),
	workDay: false,
	modalIsOpen: (isDay, workDay) => set(() => ({ isOpen: true, isDay, workDay })),
	modalIsClose: () => set(() => ({ isOpen: false })),
	isDayReset: () => set(() => ({ isDay: '' })),
	setCalendar: (year, month) => set(() => ({ year, month })),
}));

export default useStore;
