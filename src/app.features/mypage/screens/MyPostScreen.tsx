import React from 'react';
import Header from 'src/app.components/Header';
import BoardPreview from 'src/app.features/board/components/BoardPreview';
import { PostDatas } from 'src/app.features/board/types';

interface Props {
	posts: PostDatas[];
}
function MyPostScreen({ posts }: Props) {
	return (
		<>
			<Header title="내가 쓴 글" />
			<main className="pt-[7.2rem] min-h-[100vh] h-fit">
				<BoardPreview searchData={posts} search />
			</main>
		</>
	);
}

export default MyPostScreen;
