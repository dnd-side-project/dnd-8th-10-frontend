import React from 'react';
import { useRouter } from 'next/router';

function WorkModifyScreen() {
	const router = useRouter();
	return (
		<div>
			<div>출근수정</div>
			<div onClick={() => router.back()}>완료</div>
		</div>
	);
}

export default WorkModifyScreen;
