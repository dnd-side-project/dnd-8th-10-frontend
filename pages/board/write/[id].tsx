import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { boardModify, boardWrite } from 'src/app.features/board/api';
import BoardWriteScreen from 'src/app.features/board/screens/BoardWriteScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

const WritePage: NextPage = () => {
	const router = useRouter();
	const { data, refetch, isLoading } = useUser();
	const { formType, id } = router.query;

	// 게시글 작성
	const { mutate: BoardWriteMutate } = useMutation(boardWrite, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => alert('오류 발생.'),
	});

	// 게시글 수정
	const { mutate: BoardModifyMutate } = useMutation(boardModify, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => alert('오류 발생.'),
	});

	return (
		<>
			{!isLoading && (
				<div className="h-[100vh] mx-auto relative w-full">
					<BoardWriteScreen
						id={id}
						formType={formType}
						UserData={data}
						BoardWriteMutate={BoardWriteMutate}
						BoardModifyMutate={BoardModifyMutate}
					/>
				</div>
			)}
		</>
	);
};

export default WritePage;
