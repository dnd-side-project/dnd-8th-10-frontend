import create from 'zustand';

interface IStore {
	isOpen: boolean;
	isDay: string;
	modalIsOpen: (isDay: string) => void;
	modalIsClose: () => void;
}

const useStore = create<IStore>((set) => ({
	isOpen: false,
	isDay: '',
	toDay: '',
	modalIsOpen: (isDay) => set(() => ({ isOpen: true, isDay })),
	modalIsClose: () => set(() => ({ isOpen: false })),
}));

export default useStore;
