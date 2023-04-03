import create from 'zustand';

interface IStore {
	isJump: boolean;
	keypadChange: () => void;
}
const useKeypadStore = create<IStore>((set) => ({
	isJump: false,
	keypadChange: () => set((state) => ({ isJump: !state.isJump })),
}));

export default useKeypadStore;
