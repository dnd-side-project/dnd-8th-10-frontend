import React from 'react';

interface Props {
	id: string | string[] | undefined;
}
function BoardViewScreen({ id }: Props) {
	return (
		<div>
			<span className="text-subhead4">게시글 보기 페이지{id}</span>
		</div>
	);
}
export default BoardViewScreen;
