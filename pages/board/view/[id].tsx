import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import TitleHead from 'src/app.components/TitleHead';
import { boardDelete } from 'src/app.features/board/api';
import {
	deleteComment,
	getViewCheckPerson,
	postComment,
	postViewCheck,
	putComment,
} from 'src/app.features/board/api/comment';
import BoardViewScreen from 'src/app.features/board/screens/BoardViewScreen';
import useBoardView from 'src/app.modules/hooks/board/useBoardView';
import useUser from 'src/app.modules/hooks/user/useUser';

interface Props {
	serverData: any;
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const { req } = context;
	const API_URL = 'https://wise24life.shop/api/myPost';

	const { boardView, token } = req.cookies;
	const headers = { Authorization: `Bearer ${token}`, BoardView: boardView }; // 헤더 설정
	const { data } = await axios.get(API_URL, { headers }); // API 요청
	return { props: { serverData: data } };
};

const ViewPage = ({ serverData }: Props) => {
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
		<>
			<TitleHead title={boardViewData?.title ?? serverData?.title ?? ''} />
			<BoardViewScreen
				userData={userData}
				boardCheckPerson={boardCheckPerson}
				boardViewData={boardViewData ?? serverData}
				DelMutate={DelMutate}
				ViewCheckMutate={ViewCheckMutate}
				PostCommentMutate={PostCommentMutate}
				DeleteCommentMutate={DeleteCommentMutate}
				PutCommentMutate={PutCommentMutate}
			/>
		</>
	);
};

export default ViewPage;
