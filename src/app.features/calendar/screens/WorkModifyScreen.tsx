import React from 'react';
import { useRouter } from 'next/router';

function WorkModifyScreen() {
	const router = useRouter();
	return (
		<div>
			<div>출근수정</div>
			<button onClick={() => router.back()}>완료</button>
		</div>
	);
}

export default WorkModifyScreen;
