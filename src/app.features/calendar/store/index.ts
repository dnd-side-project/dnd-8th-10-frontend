import create from 'zustand';

interface IStore {
	isOpen: boolean;
	isDay: string;
	workDay: string;
	modalIsOpen: (isDay: string, workDay: string) => void;
}

const useStore = create<IStore>((set) => ({
	isOpen: false,
	isDay: '',
	toDay: '',
	workDay: '',
	modalIsOpen: (isDay, workDay) => set(() => ({ isOpen: true, isDay, workDay })),
}));

export default useStore;
