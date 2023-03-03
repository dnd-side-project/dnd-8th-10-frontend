import { useRouter } from 'next/router';
import React from 'react';
import Header from 'src/app.components/Header';
import { formatDate } from 'src/app.features/board/utils';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import TotalColorIcon from '../../../app.modules/assets/board/category/color/total.svg';
import NoticeColorIcon from '../../../app.modules/assets/board/category/color/notice.svg';
import PersonalNoticeColorIcon from '../../../app.modules/assets/board/category/color/personalNotice.svg';
import EducationColorIcon from '../../../app.modules/assets/board/category/color/education.svg';
import CoverColorIcon from '../../../app.modules/assets/board/category/color/cover.svg';
import QuestionColorIcon from '../../../app.modules/assets/board/category/color/question.svg';

interface Props {
	AlarmData: [
		{
			userName: string;
			postId: number;
			title: string;
			category: string;
			createDate: string;
			role: string;
		}
	];
}
function AlarmScreen({ AlarmData }: Props) {
	const router = useRouter();

	return (
		<div className="min-h-[100vh]">
			<Header title="알림" />
			<div className="pt-[7.2rem]">
				{AlarmData.map((post, index) => (
					<div
						role="presentation"
						key={index}
						className="flex items-center first:pt-[0rem] py-[1.6rem] border-solid border-b-[0.05rem] border-b-g3 h-fit"
						onClick={() => router.push(`${SERVICE_URL.boardView}/${post.postId}`)}
					>
						<div className="mr-[1.2rem] w-[4rem] h-[4rem] rounded-[0.8rem] bg-g1 flex justify-center items-center">
							{post.category === 'all' && <TotalColorIcon />}
							{post.category === 'notice' && <NoticeColorIcon />}
							{post.category === 'pesonalNotice' && <PersonalNoticeColorIcon />}
							{post.category === 'education' && <EducationColorIcon />}
							{post.category === 'cover' && <CoverColorIcon />}
							{post.category === 'question' && <QuestionColorIcon />}
						</div>
						<div>
							<div>
								<span className="text-subhead2 text-g9">{post.title}</span>
							</div>
							<div className="flex justify-between">
								<div className="text-body1">
									<span className="text-g6">
										{post.userName} {post.role === 'MANAGER' ? '점장' : '알바생'} {formatDate(post.createDate)}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default AlarmScreen;
