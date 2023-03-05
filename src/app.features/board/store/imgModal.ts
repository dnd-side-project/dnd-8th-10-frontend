import create from 'zustand';

interface IStore {
	isImgModalOpen: boolean;
	modalIndex: number;
	imgModalIsOpen: (index: number) => void;
	imgModalIsClose: () => void;
}

const useImgModal = create<IStore>((set) => ({
	isImgModalOpen: false,
	modalIndex: 0,
	imgModalIsOpen: (index) => set(() => ({ isImgModalOpen: true, modalIndex: index })),
	imgModalIsClose: () => set(() => ({ isImgModalOpen: false })),
}));

export default useImgModal;
