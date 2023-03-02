import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { boardDelete } from 'src/app.features/board/api';
import { postViewCheck } from 'src/app.features/board/api/viewResponse';
import BoardViewScreen from 'src/app.features/board/screens/BoardViewScreen';
import useBoardView from 'src/app.modules/hooks/board/useBoardView';

const ViewPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	// 게시글 보기
	const { boardViewData } = useBoardView(id);
	const queryClient = useQueryClient();
	// 게시물 확인 버튼 클릭
	const { mutate: ViewCheckMutate } = useMutation(postViewCheck, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => console.log(error),
	});

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
			<BoardViewScreen boardViewData={boardViewData} DelMutate={DelMutate} ViewCheckMutate={ViewCheckMutate} />
		</div>
	);
};

export default ViewPage;
