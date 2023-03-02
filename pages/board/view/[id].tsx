import { useMutation, useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { boardDelete } from 'src/app.features/board/api';
import BoardViewScreen from 'src/app.features/board/screens/BoardViewScreen';
import useBoardView from 'src/app.modules/hooks/board/useBoardView';

const ViewPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	// 게시글 보기
	const { boardViewData, boardViewLoading } = useBoardView(id);

	// 게시글 삭제
	const { mutate: DelMutate } = useMutation(boardDelete, {
		onSuccess: (res) => {
			console.log(res);
			router.back();
		},
		onError: (error) => console.log(error),
	});
	console.log(boardViewData);
	return (
		<div className="h-[100vh]">
			<BoardViewScreen boardViewData={boardViewData} DelMutate={DelMutate} />
		</div>
	);
};

export default ViewPage;
