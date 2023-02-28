import type { NextPage } from 'next';
import React from 'react';
import BoardWriteScreen from 'src/app.features/board/screens/BoardWriteScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

const WritePage: NextPage = () => {
	const { data, refetch, isLoading } = useUser();
	return (
		<>
			{!isLoading && (
				<div className="h-[100vh] mx-auto relative w-full">
					<BoardWriteScreen UserData={data} />
				</div>
			)}
		</>
	);
};

export default WritePage;
