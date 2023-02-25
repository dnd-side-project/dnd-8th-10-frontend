import { useRouter } from 'next/router';
import React from 'react';
import WriteIcon from 'src/app.modules/assets/board/write.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
function BoardScreen() {
	const router = useRouter();
	return (
		<div>
			<span className="text-subhead4">게시판 페이지</span>
			<div onClick={() => router.push(`${SERVICE_URL.boardView}/${1}`)}>화장실 문고리 부서졌어요....</div>
			<div onClick={() => router.push(`${SERVICE_URL.boardWrite}`)}>
				<WriteIcon />
			</div>
		</div>
	);
}
export default BoardScreen;
