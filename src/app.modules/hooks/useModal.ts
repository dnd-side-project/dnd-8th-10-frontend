import { useState } from 'react';

function useModal() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const closeAnimationModal = () => {
		setTimeout(() => {
			setIsModalOpen(false);
		}, 500);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	return { isModalOpen, openModal, closeModal, closeAnimationModal };
}

export default useModal;
