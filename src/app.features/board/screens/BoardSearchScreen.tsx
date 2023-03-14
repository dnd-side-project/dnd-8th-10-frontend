import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SearchIcon from 'src/app.modules/assets/search.svg';
import DelIcon from 'src/app.modules/assets/inputDel.svg';
import Overlay from 'src/app.components/Modal/Overlay';
import Modal from 'src/app.components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import useModal from 'src/app.modules/hooks/useModal';
import BackIcon from '../../../app.modules/assets/back.svg';
import BoardPreview from '../components/BoardPreview';
import { boardSearch } from '../api/search';
import useStore from '../store';

function BoardSearchScreen() {
	const router = useRouter();
	const { isModalOpen, openModal, closeModal } = useModal();

	const { setSelectedCategory } = useStore();
	const [searchContent, setEearchContent] = useState('');
	const { data: searchData, refetch: searchRefetch } = useQuery(['boardSearch'], () => boardSearch(searchContent), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: false,
	});

	const searchdHandler = (event: React.ChangeEvent<HTMLInputElement>) => setEearchContent(event.target.value);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		if (searchContent.length <= 1) {
			openModal();
		} else {
			searchRefetch();
			event.preventDefault();
		}
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
				<BoardPreview searchData={searchData} search />
			</div>
			{isModalOpen && (
				<Overlay>
					<Modal
						title="두글자 이상 입력해주세요."
						yesFn={() => {
							closeModal();
						}}
						yesTitle="확인"
					/>
				</Overlay>
			)}
		</div>
	);
}
export default BoardSearchScreen;
