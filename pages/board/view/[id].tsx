import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { boardDelete } from 'src/app.features/board/api';
import {
	deleteComment,
	getViewCheckPerson,
	postComment,
	postViewCheck,
	putComment,
} from 'src/app.features/board/api/viewResponse';
import BoardViewScreen from 'src/app.features/board/screens/BoardViewScreen';
import { IComment } from 'src/app.features/board/types';
import { getCookie } from 'src/app.modules/cookie';
import useBoardView from 'src/app.modules/hooks/board/useBoardView';
import useUser from 'src/app.modules/hooks/user/useUser';

const ViewPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const queryClient = useQueryClient();
	// 게시글 보기
	const { boardViewData, boardViewReftch } = useBoardView(id);

	// 게시물 확인 버튼 클릭
	const { mutate: ViewCheckMutate } = useMutation(postViewCheck, {
		onSuccess: (res) => {
			console.log(res);
			queryClient.invalidateQueries(['boardView', id]);
			queryClient.invalidateQueries(['boardCheckPerson', id]);
		},
		onError: (error) => console.log(error),
	});
	// 게시물 체크한 사람
	const { data: boardCheckPerson } = useQuery(['boardCheckPerson', id], () => getViewCheckPerson(Number(id)), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: !!id,
	});

	// 댓글 작성
	const { mutate: PostCommentMutate } = useMutation(postComment, {
		onSuccess: (res) => {
			console.log(res);
			queryClient.invalidateQueries(['boardView', id]);
		},
		onError: (error) => console.log(error),
	});
	// 댓글 수정
	const { mutate: PutCommentMutate } = useMutation(putComment, {
		onSuccess: (res) => {
			console.log(res);
			queryClient.invalidateQueries(['boardView', id]);
		},
		onError: (error) => console.log(error),
	});
	// 댓글 삭제
	const { mutate: DeleteCommentMutate } = useMutation(deleteComment, {
		onSuccess: (res) => {
			queryClient.invalidateQueries(['boardView', id]);
		},
		onError: (error) => console.log(error),
	});

	// 게시글 삭제
	const { mutate: DelMutate } = useMutation(boardDelete, {
		onSuccess: (res) => {
			console.log('게시글 삭제');
			router.back();
		},
		onError: (error) => console.log(error),
	});

	const { data: userData, isLoading: LoadingData } = useUser();

	return (
		<div className="h-[100vh]">
			<BoardViewScreen
				userData={userData}
				boardCheckPerson={boardCheckPerson}
				boardViewData={boardViewData}
				DelMutate={DelMutate}
				ViewCheckMutate={ViewCheckMutate}
				PostCommentMutate={PostCommentMutate}
				DeleteCommentMutate={DeleteCommentMutate}
				PutCommentMutate={PutCommentMutate}
			/>
		</div>
	);
};

export default ViewPage;
