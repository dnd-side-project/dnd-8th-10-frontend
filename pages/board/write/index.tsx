import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { boardWrite, boardWriteImg } from 'src/app.features/board/api';
import BoardWriteScreen from 'src/app.features/board/screens/BoardWriteScreen';
import useStore from 'src/app.features/board/store';
import useUser from 'src/app.modules/hooks/user/useUser';

const WritePage: NextPage = () => {
	const router = useRouter();
	const { data, refetch, isLoading: useLoading } = useUser();
	const { imgData } = useStore();

	// 게시글 이미지 작성
	const { mutate: BoardWriteImgMutate } = useMutation(boardWriteImg, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => console.log(error),
	});

	// 게시글 작성
	const { mutate: BoardWriteMutate } = useMutation(boardWrite, {
		onSuccess: (res) => {
			// 게시글 작성 성공해서 postId 받으면 이미지도 업로드.
			if (imgData.length > 0) {
				const postId = +res.data.data.postId;
				if (postId) {
					const formData = new FormData();
					for (let i = 0; i < imgData.length; i += 1) {
						formData.append('files', imgData[i]);
					}
					BoardWriteImgMutate({ postId, FormData: formData });
				}
			}
			router.back();
		},

		onError: (error) => alert('오류 발생.'),
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
