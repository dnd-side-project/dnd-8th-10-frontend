import React from 'react';
import SlideImgIcon from '../assets/slideImg.svg';
import Badge from 'src/app.components/app.base/Button/Badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function BoardPreviewSlider() {
	return (
		<div className="my-[1.6rem] ">
			<Swiper slidesPerView={2} spaceBetween={90}>
				{[...new Array(10)].map((_, index) => (
					<SwiperSlide key={index}>
						<div className="w-fit mr-[0.8rem]">
							<SlideImgIcon />
							<div className="flex items-center mt-[0.8rem]">
								<Badge color="secondary" size="small">
									공지
								</Badge>
								<span className="text-subhead2 text-g9 ml-[0.8rem]">{index}월 발렌타인데이 이벤트 필독!</span>
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
