import { useRouter } from 'next/router';
import React from 'react';
import Header from 'src/app.components/Header';
import { categoryMapKr, formatDate } from 'src/app.features/board/utils';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import TotalColorIcon from '../../../app.modules/assets/board/category/color/total.svg';
import NoticeColorIcon from '../../../app.modules/assets/board/category/color/notice.svg';
import PersonalNoticeColorIcon from '../../../app.modules/assets/board/category/color/personalNotice.svg';
import EducationColorIcon from '../../../app.modules/assets/board/category/color/education.svg';
import CoverColorIcon from '../../../app.modules/assets/board/category/color/cover.svg';
import QuestionColorIcon from '../../../app.modules/assets/board/category/color/question.svg';
import MentioinIcon from '../../../app.modules/assets/board/category/color/mention.svg';

interface Props {
	AlarmData: [
		{
			userName: string;
			postId: number;
			title: string;
			category: string; // TODO: mapping
			createDate: string;
			role: string;
			checked: boolean;
		}
	];
}
function AlarmScreen({ AlarmData }: Props) {
	const router = useRouter();
	const getPostIcon = (category: string) => {
		switch (category) {
			case 'notice':
				return <NoticeColorIcon />;
			case 'pesonalNotice':
				return <PersonalNoticeColorIcon />;
			case 'education':
				return <EducationColorIcon />;
			case 'cover':
				return <CoverColorIcon />;
			case 'question':
				return <QuestionColorIcon />;

			default:
				return <MentioinIcon />;
		}
	};
	return (
		<>
			<Header title="알림" />
			<main className="min-h-[100vh]">
				<ul className="pt-[5.6rem]">
					{AlarmData.reverse().map((post, index) => (
						<li
							role="presentation"
							key={index}
							className={`${
								post.checked
									? 'border-solid border-b-[0.05rem] border-b-g3'
									: 'bg-primarySub w-[100vw] max-w-[50rem] -translate-x-[2rem] px-[2rem] -mt-[0.1rem]'
							} flex   py-[1.6rem]  h-fit`}
							onClick={() => router.push(`${SERVICE_URL.boardView}/${post.postId}`)}
						>
							<div className="mr-[1.2rem] w-[4rem] h-[4rem] rounded-[0.8rem] bg-g1 flex justify-center items-center">
								{getPostIcon(post.category)}
							</div>
							<div>
								<div className="mb-[0.8rem]">
									<span className="text-subhead2 text-g9">
										{categoryMapKr[post.category] ?? post.category}{' '}
										{categoryMapKr[post.category] ? ' 글이 등록되었습니다.' : '님이 나를 언급하였습니다.'}
									</span>
								</div>
								<div className="mb-[0.4rem]">
									{categoryMapKr[post.category] ? (
										<p className="text-subhead1 text-g9">{post.title}</p>
									) : (
										// eslint-disable-next-line react/no-danger
										<p dangerouslySetInnerHTML={{ __html: post.title }} className="text-subhead1 text-g9" />
									)}
								</div>
								<div className="flex justify-between">
									<div className="text-body1">
										<span className="text-g6">
											{post.userName} {post.role === 'MANAGER' ? '점장' : '알바생'} {formatDate(post.createDate)}
										</span>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</main>
		</>
	);
}
export default AlarmScreen;
