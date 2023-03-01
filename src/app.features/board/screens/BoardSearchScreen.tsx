import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SearchIcon from 'src/app.modules/assets/search.svg';
import DelIcon from 'src/app.modules/assets/inputDel.svg';
import Overlay from 'src/app.components/Modal/Overlay';
import Modal from 'src/app.components/Modal/Modal';
import useModalStore from 'src/app.modules/store/modal';
import BackIcon from '../../../app.modules/assets/back.svg';
import BoardPreview from '../components/BoardPreview';

function BoardSearchScreen() {
	const router = useRouter();
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const [searchContent, setEearchContent] = useState('');
	const searchdHandler = (event: React.ChangeEvent<HTMLInputElement>) => setEearchContent(event.target.value);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		if (searchContent.length <= 1) {
			modalIsOpen();
		}
		event.preventDefault();
	};

	return (
		<div>
			<header className="w-full h-[5.6rem] flex items-center mb-[0.6rem]">
				<button type="button" onClick={() => router.back()}>
					<BackIcon stroke="#66666E" />
				</button>
				<div className="px-[1.2rem] flex items-center justify-between bg-g1 rounded-[0.8rem] w-full h-[3.6rem] ml-[1.4rem]">
					<div className="flex items-center">
						<SearchIcon />
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								onChange={searchdHandler}
								value={searchContent}
								className="w-full bg-g1 placeholder:text-g7 placeholder:text-body2 text-subhead2 text-g9 ml-[0.8rem] focus:outline-none"
								placeholder="제목, 글 종류, 작성자 검색"
							/>
						</form>
					</div>
					{searchContent.length > 1 && (
						<button type="button" onClick={() => setEearchContent('')}>
							<DelIcon />
						</button>
					)}
				</div>
			</header>
			<div>
				<BoardPreview />
			</div>
			{isModalOpen && (
				<Overlay>
					<Modal
						title="두글자 이상 입력해주세요."
						yesFn={() => {
							modalIsClose();
						}}
						yesTitle="확인"
					/>
				</Overlay>
			)}
		</div>
	);
}
export default BoardSearchScreen;
