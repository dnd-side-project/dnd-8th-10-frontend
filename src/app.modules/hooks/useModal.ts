import { useState } from 'react';

function useModal() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	return { isModalOpen, closeModal, openModal };
}

export default useModal;
