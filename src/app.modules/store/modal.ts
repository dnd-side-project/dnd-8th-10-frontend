import create from 'zustand';

interface IStore {
	isModalOpen: boolean;
	modalIsOpen: () => void;
	modalIsClose: () => void;
}

const useModalStore = create<IStore>((set) => ({
	isModalOpen: false,
	modalIsOpen: () => set(() => ({ isModalOpen: true })),
	modalIsClose: () => set(() => ({ isModalOpen: false })),
}));

export default useModalStore;
