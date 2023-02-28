import React from 'react';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Badge from 'src/app.components/app.base/Button/Badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/router';
import SlideImgIcon from '../../assets/slideImg.svg';

function BoardPreviewSlider() {
	const router = useRouter();
	return (
		<div className="my-[1.6rem] w-[calc(100%+4rem)] -translate-x-[2rem]">
			<Swiper
				pagination={{
					clickable: true,
				}}
				slidesPerView="auto"
				spaceBetween={8}
				slidesOffsetBefore={16}
				slidesOffsetAfter={16}
			>
				{[...new Array(11)].map((_, index) => (
					<SwiperSlide key={index} style={{ width: '225px' }}>
						<div role="presentation" className="w-fit" onClick={() => router.push(`${SERVICE_URL.boardView}/${index}`)}>
							<SlideImgIcon />
							<div className="flex items-center mt-[0.8rem]">
								<Badge color="secondary" size="small">
									공지
								</Badge>
								<span className="text-subhead2 text-g9 ml-[0.8rem]">
									{`${index + 1}월 발렌타인데이 이벤트 필독!`.slice(0, 17)}
								</span>
							</div>
							<div className="mt-[0.2rem]">
								<span className="text-body1 text-g7">김냠냠 점장 1분전</span>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default BoardPreviewSlider;
