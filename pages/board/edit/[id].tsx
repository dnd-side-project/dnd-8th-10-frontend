import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { boardModify, boardWriteImg } from 'src/app.features/board/api';
import BoardEditScreen from 'src/app.features/board/screens/BoardEditScreen';
import useBoardView from 'src/app.modules/hooks/board/useBoardView';
import useUser from 'src/app.modules/hooks/user/useUser';

const EditPage: NextPage = () => {
	const router = useRouter();
	const { data, refetch, isLoading: useLoading } = useUser();
	const { id } = router.query;

	// 게시글 보기
	const { boardViewData, boardViewReftch, boardViewLoading } = useBoardView(id);

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
	const { mutate: BoardWriteImgMutate } = useMutation(boardWriteImg, {
		onSuccess: (res) => {
			console.log(res);
			router.back();
		},
		onError: (error) => console.log(error),
	});
	return (
		<>
			{!boardViewLoading && !useLoading && (
				<div className="h-[100vh] mx-auto relative w-full">
					<BoardEditScreen
						id={id}
						UserData={data}
						boardViewData={boardViewData}
						BoardModifyMutate={BoardModifyMutate}
						BoardWriteImgMutate={BoardWriteImgMutate}
					/>
				</div>
			)}
		</>
	);
};

export default EditPage;
