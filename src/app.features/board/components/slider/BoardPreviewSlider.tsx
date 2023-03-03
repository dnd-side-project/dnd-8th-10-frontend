import React, { useEffect, useState } from 'react';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Badge from 'src/app.components/app.base/Button/Badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/router';
import { boardCheckCategory } from '../../api';
import { categoryMapEng, categoryMapKr, formatDate } from '../../utils';
import { IBoardViewData } from '../../types';
import NoImage from '../../../../../public/images/board/noImage.svg';
function BoardPreviewSlider() {
	const router = useRouter();
	const [BoardPreviewData, setBoardPreviewData] = useState<IBoardViewData[]>([]);
	useEffect(() => {
		const pesonalNoticeData = boardCheckCategory(categoryMapEng['공지']);
		const noticeData = boardCheckCategory(categoryMapEng['전달']);
		Promise.all([pesonalNoticeData, noticeData]).then((responses) => {
			const allPosts = responses[0].data.data;
			const noticePosts = responses[1].data.data;
			const data = allPosts.concat(noticePosts);
			data.sort((a: { postId: number }, b: { postId: number }) => b.postId - a.postId);
			setBoardPreviewData(data);
		});
	}, []);

	return (
		<div>
			<div className="mt-[1.6rem] mb-[0.8rem]">
				<h2 className="text-subhead4 text-g9">최신 공지/전달 사항</h2>
			</div>
			<div className="mb-[1.6rem] w-[calc(100%+4rem)] -translate-x-[2rem]">
				<Swiper
					pagination={{
						clickable: true,
					}}
					slidesPerView="auto"
					spaceBetween={8}
					slidesOffsetBefore={16}
					slidesOffsetAfter={16}
				>
					{BoardPreviewData.map((post, index) => (
						<SwiperSlide key={index} style={{ width: '225px' }}>
							<div
								role="presentation"
								className="w-fit"
								onClick={() => router.push(`${SERVICE_URL.boardView}/${post.postId}`)}
							>
								<NoImage />
								<div className="flex items-center mt-[0.8rem]">
									<Badge color="secondary" size="small">
										{categoryMapKr[post.category]}
									</Badge>
									<span className="text-subhead2 text-g9 ml-[0.8rem]">{post.title}</span>
								</div>
								<div className="mt-[0.2rem]">
									<span className="text-body1 text-g7">
										{post.userName} {post.role === 'MANAGER' ? '점장' : '알바생'} {formatDate(post.createDate)}
									</span>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default BoardPreviewSlider;
