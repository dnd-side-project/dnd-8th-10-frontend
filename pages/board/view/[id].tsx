import { useMutation, useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { boardDelete, boardModify, boardView } from 'src/app.features/board/api';
import BoardViewScreen from 'src/app.features/board/screens/BoardViewScreen';

const ViewPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	// 게시글 보기
	const { data: boardViewData, refetch: boardViewReftch } = useQuery(['boardLoad'], () => boardView(Number(id)), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
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
			<BoardViewScreen id={id} boardViewData={boardViewData} DelMutate={DelMutate} />
		</div>
	);
};

export default ViewPage;
