import { useRouter } from 'next/router';
import React from 'react';
import Badge from 'src/app.components/app.base/Button/Badge';
import { categoryMapKr } from 'src/app.features/board/utils';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

interface Props {
	boardNoticeData: {
		postId: number;
		title: string;
		category: string;
	};
}
function BoardPreview({ boardNoticeData }: Props) {
	const router = useRouter();
	return (
		<div
			role="presentation"
			onClick={() => router.push(`${SERVICE_URL.boardView}/${boardNoticeData?.postId}`)}
			className="flex items-center justify-between rounded-[1.2rem] px-[1.6rem] py-[1rem] shadow-blue"
		>
			<div className="flex items-center">
				<Badge color="secondary" size="small">
					{categoryMapKr[boardNoticeData?.category]}
				</Badge>
				<div className="ml-[1rem]">
					<span className="text-subhead2 text-g9">{boardNoticeData?.title}</span>
				</div>
			</div>
			<div>
				<span className="text-subhead1 text-g6">전체보기</span>
			</div>
		</div>
	);
}

export default BoardPreview;
