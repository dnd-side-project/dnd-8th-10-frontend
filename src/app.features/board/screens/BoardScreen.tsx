import { useRouter } from 'next/router';
import React from 'react';
import WriteIcon from 'src/app.modules/assets/board/write.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import SearchIcon from 'src/app.modules/assets/search.svg';
import BoardPreviewSlider from '../components/BoardPreviewSlider';
import Divider from 'src/app.components/Divider';

function BoardScreen() {
	const router = useRouter();
	return (
		<div>
			<header className="w-full h-[5.6rem] flex items-center justify-between">
				<span className="text-g10 text-subhead4 ml-[0.1rem]">편의점 게시판</span>
				<SearchIcon />
			</header>
			<BoardPreviewSlider />

			<Divider />
			<div
				className="fixed bottom-0 right-0 mb-[8.1rem] mr-[2rem]"
				role="presentation"
				onClick={() => router.push(`${SERVICE_URL.boardWrite}`)}
			>
				<WriteIcon />
			</div>
		</div>
	);
}
export default BoardScreen;

/* <div onClick={() => router.push(`${SERVICE_URL.boardView}/${1}`)}>화장실 문고리 부서졌어요....</div> */
