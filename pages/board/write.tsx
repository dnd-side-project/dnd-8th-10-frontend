import type { NextPage } from 'next';
import React from 'react';
import BoardWriteScreen from 'src/app.features/board/screens/BoardWriteScreen';
const WritePage: NextPage = () => {
	return (
		<div className="h-[100vh] mx-auto relative w-full">
			<BoardWriteScreen />
		</div>
	);
};

export default WritePage;
