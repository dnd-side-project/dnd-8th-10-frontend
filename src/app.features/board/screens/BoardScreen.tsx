import { useRouter } from 'next/router';
import React from 'react';
import WriteIcon from 'src/app.modules/assets/board/write.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import SearchIcon from 'src/app.modules/assets/search.svg';
import Divider from 'src/app.components/Divider';
import BoardPreviewSlider from '../components/slider/BoardPreviewSlider';
import BoardCategorySlider from '../components/slider/BoardCategorySlider';
import BoardPreview from '../components/BoardPreview';

function BoardScreen() {
	const router = useRouter();
	return (
		<div className="">
			<header className="w-full h-[5.6rem] flex items-center justify-between">
				<span className="text-g10 text-subhead4 ml-[0.1rem]">편의점 게시판</span>
				<button type="button" onClick={() => router.push(SERVICE_URL.boardSearch)}>
					<SearchIcon />
				</button>
			</header>
			<BoardPreviewSlider />
			<Divider />
			<div className="my-[2.4rem]">
				<BoardCategorySlider />
			</div>
			<div className="mb-[5.6rem]">
				<BoardPreview />
			</div>
			<div className="flex justify-end max-w-[50rem] -translate-x-[4rem] w-full fixed bottom-0 mb-[8.1rem] pointer-events-none">
				<button className="cursor-pointer pointer-events-auto" onClick={() => router.push(SERVICE_URL.boardWrite)}>
					<WriteIcon />
				</button>
			</div>
		</div>
	);
}
export default BoardScreen;
