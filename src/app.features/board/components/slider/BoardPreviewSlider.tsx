import React, { useEffect, useState } from 'react';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Badge from 'src/app.components/app.base/Button/Badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/router';
import { boardCheckCategory, boardImgLoad } from '../../api';
import { categoryMapEng, categoryMapKr, formatDate } from '../../utils';
import { IBoardViewData } from '../../types';
import NoImage from '../../../../../public/images/board/noImage.svg';

function BoardPreviewSlider() {
	const router = useRouter();
	const [BoardPreviewData, setBoardPreviewData] = useState<IBoardViewData[]>([]);
	const [thumbnail, setThumbnail] = useState<string[]>([]);

	useEffect(() => {
		const pesonalNoticeData = boardCheckCategory(categoryMapEng['공지']);
		const noticeData = boardCheckCategory(categoryMapEng['전달']);
		Promise.all([pesonalNoticeData, noticeData]).then((res) => {
			const allPosts = res[0].data.data;
			const noticePosts = res[1].data.data;
			const data = allPosts
				.concat(noticePosts)
				.sort((a: { postId: number }, b: { postId: number }) => b.postId - a.postId);
			setBoardPreviewData(data);
			const postIds = data.map((post: { postId: number }) => post.postId);
			Promise.all(postIds.map((postId: number) => boardImgLoad(postId))).then((thumbnailRes) => {
				setThumbnail(thumbnailRes.map((thumbnailMap) => thumbnailMap.data));
			});
		});
	}, []);

	return (
		<div>
			<div className="mt-[1.6rem] mb-[0.8rem]">
				<h2 className="text-subhead4 text-g9">최신 공지/전달 사항</h2>
			</div>
			<div className="mb-[1.6rem] w-[calc(100%+4rem)] -translate-x-[2rem]">
				<Swiper slidesPerView="auto" spaceBetween={8} slidesOffsetBefore={16} slidesOffsetAfter={16}>
					{BoardPreviewData.map((post, index) => (
						<SwiperSlide key={index} style={{ width: '225px' }}>
							<div role="presentation" onClick={() => router.push(`${SERVICE_URL.boardView}/${post.postId}`)}>
								{thumbnail.length > 0 && thumbnail[index]?.length > 0 ? (
									<img
										className="rounded-[0.8rem] w-[22.5rem] h-[10.1rem] object-cover"
										src={`data:image/png;base64,${thumbnail[index][0]}`}
										alt={String(index)}
									/>
								) : (
									<NoImage />
								)}
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
