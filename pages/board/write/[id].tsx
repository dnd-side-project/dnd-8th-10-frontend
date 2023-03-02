import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { boardModify, boardWrite } from 'src/app.features/board/api';
import BoardWriteScreen from 'src/app.features/board/screens/BoardWriteScreen';
import useBoardView from 'src/app.modules/hooks/board/useBoardView';
import useUser from 'src/app.modules/hooks/user/useUser';

const WritePage: NextPage = () => {
	const router = useRouter();
	const { data, refetch, isLoading: useLoading } = useUser();
	const { formType, id } = router.query;

	// 게시글 보기
	const boardViewResult = useBoardView(id);
	const boardViewData = id !== 'new' ? boardViewResult.boardViewData : undefined;
	const boardViewLoading = id !== 'new' ? boardViewResult.boardViewLoading : false;

	// 게시글 작성
	const { mutate: BoardWriteMutate } = useMutation(boardWrite, {
		onSuccess: (res) => {
			// console.log(res);
			router.back();
		},
		onError: (error) => alert('오류 발생.'),
	});

	// 게시글 수정
	const queryClient = useQueryClient(); // useQueryClient hook으로 캐시된 데이터 갱신
	const { mutate: BoardModifyMutate } = useMutation(boardModify, {
		onSuccess: (res) => {
			// console.log(res);
			queryClient.invalidateQueries(['boardView', id]); // 수정된 데이터를 다시 가져오기 위해 캐시된 데이터를 갱신
			router.replace(`/board/view/${id}`); // 새로운 페이지로 이동하여 서버로부터 최신 데이터를 받아옴
		},
		onError: (error) => alert('오류 발생.'),
	});

	return (
		<>
			{!boardViewLoading && !useLoading && (
				<div className="h-[100vh] mx-auto relative w-full">
					<BoardWriteScreen
						id={id}
						formType={formType}
						UserData={data}
						boardViewData={boardViewData}
						BoardWriteMutate={BoardWriteMutate}
						BoardModifyMutate={BoardModifyMutate}
					/>
				</div>
			)}
		</>
	);
};

export default WritePage;
