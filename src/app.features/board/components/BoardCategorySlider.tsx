import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TotalIcon from '../../../app.modules/assets/board/category/total.svg';
import NoticeIcon from '../../../app.modules/assets/board/category/notice.svg';
import PersonalNoticeIcon from '../../../app.modules/assets/board/category/personalNotice.svg';
import EducationIcon from '../../../app.modules/assets/board/category/education.svg';
import CoverIcon from '../../../app.modules/assets/board/category/cover.svg';
import QuestionIcon from '../../../app.modules/assets/board/category/question.svg';
import TotalColorIcon from '../../../app.modules/assets/board/category/color/total.svg';
import NoticeColorIcon from '../../../app.modules/assets/board/category/color/notice.svg';
import PersonalNoticeColorIcon from '../../../app.modules/assets/board/category/color/personalNotice.svg';
import EducationColorIcon from '../../../app.modules/assets/board/category/color/education.svg';
import CoverColorIcon from '../../../app.modules/assets/board/category/color/cover.svg';
import QuestionColorIcon from '../../../app.modules/assets/board/category/color/question.svg';
import 'swiper/css';

function BoardCategorySlider() {
	const [selectedCategory, setSelectedCategory] = useState('전체');

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
	};

	return (
		<div className="my-[2.4rem] w-[calc(100%+4rem)] -translate-x-[2rem] mb-[2.4rem]">
			<Swiper slidesPerView="auto" spaceBetween={8} slidesOffsetBefore={16} slidesOffsetAfter={16}>
				{[
					{ icon: TotalIcon, colorIcon: TotalColorIcon, category: '전체' },
					{ icon: NoticeIcon, colorIcon: NoticeColorIcon, category: '공지사항' },
					{ icon: PersonalNoticeIcon, colorIcon: PersonalNoticeColorIcon, category: '개인알림' },
					{ icon: EducationIcon, colorIcon: EducationColorIcon, category: '교육' },
					{ icon: CoverIcon, colorIcon: CoverColorIcon, category: '표지' },
					{ icon: QuestionIcon, colorIcon: QuestionColorIcon, category: '문의' },
				].map(({ icon: Icon, colorIcon: ColorIcon, category }, index) => (
					<SwiperSlide key={index} style={{ width: '64px' }}>
						<div role="presentation" className="w-fit" onClick={() => handleCategoryClick(category)}>
							<div
								className={`w-[6.4rem] h-[6.4rem] flex justify-center items-center rounded-[0.8rem] ${
									selectedCategory === category ? 'bg-primarySub' : 'bg-g2'
								}`}
							>
								{selectedCategory === category ? <ColorIcon /> : <Icon />}
							</div>
							<div className="text-center mt-[0.6rem]">
								<span className={`text-body1 ${selectedCategory === category ? 'text-primary' : 'text-g8'}  `}>
									{category}
								</span>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default BoardCategorySlider;
