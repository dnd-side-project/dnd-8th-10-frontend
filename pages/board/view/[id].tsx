import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { boardDelete } from 'src/app.features/board/api';
import { postComment, postViewCheck } from 'src/app.features/board/api/viewResponse';
import BoardViewScreen from 'src/app.features/board/screens/BoardViewScreen';
import { IComment } from 'src/app.features/board/types';
import useBoardView from 'src/app.modules/hooks/board/useBoardView';

const ViewPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	// 게시글 보기
	const { boardViewData } = useBoardView(id);

	const [mutateCommentResult, setMutateCommentResult] = useState<IComment[]>();
	// 게시물 확인 버튼 클릭
	const { mutate: ViewCheckMutate } = useMutation(postViewCheck, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => console.log(error),
	});

	// 댓글 작성
	const { mutate: PostCommentMutate } = useMutation(postComment, {
		onSuccess: (res) => {
			const { comments: newComments } = res.data.data;

			setMutateCommentResult(newComments);
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

	return (
		<div className="h-[100vh]">
			<BoardViewScreen
				boardViewData={boardViewData}
				DelMutate={DelMutate}
				ViewCheckMutate={ViewCheckMutate}
				PostCommentMutate={PostCommentMutate}
				mutateCommentResult={mutateCommentResult ?? []}
			/>
		</div>
	);
};

export default ViewPage;
