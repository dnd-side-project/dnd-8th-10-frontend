import create from 'zustand';

interface IStore {
	isImgModalOpen: boolean;
	imgModalIsOpen: () => void;
	imgModalIsClose: () => void;
}

const useImgModal = create<IStore>((set) => ({
	isImgModalOpen: false,
	imgModalIsOpen: () => set(() => ({ isImgModalOpen: true })),
	imgModalIsClose: () => set(() => ({ isImgModalOpen: false })),
}));

export default useImgModal;
