import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { boardWrite, boardWriteImg } from 'src/app.features/board/api';
import BoardWriteScreen from 'src/app.features/board/screens/BoardWriteScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

const WritePage: NextPage = () => {
	const router = useRouter();
	const { data, refetch, isLoading: useLoading } = useUser();

	// 게시글 작성
	const { mutate: BoardWriteMutate } = useMutation(boardWrite, {
		onSuccess: (res) => {
			// console.log(res);
			router.back();
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
			{!useLoading && (
				<div className="h-[100vh] mx-auto relative w-full">
					<BoardWriteScreen
						UserData={data}
						BoardWriteMutate={BoardWriteMutate}
						BoardWriteImgMutate={BoardWriteImgMutate}
					/>
				</div>
			)}
		</>
	);
};

export default WritePage;
