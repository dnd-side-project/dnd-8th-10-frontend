import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import React from 'react';
import { boardWrite } from 'src/app.features/board/api';
import BoardWriteScreen from 'src/app.features/board/screens/BoardWriteScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

const WritePage: NextPage = () => {
	const { data, refetch, isLoading } = useUser();

	// 게시글 작성
	const { mutate: BoardWriteMutate } = useMutation(boardWrite, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => alert('오류 발생.'),
	});
	return (
		<>
			{!isLoading && (
				<div className="h-[100vh] mx-auto relative w-full">
					<BoardWriteScreen UserData={data} BoardWriteMutate={BoardWriteMutate} />
				</div>
			)}
		</>
	);
};

export default WritePage;
