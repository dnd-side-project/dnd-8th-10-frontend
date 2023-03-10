import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import TotalIcon from '../../../../app.modules/assets/board/category/total.svg';
import NoticeIcon from '../../../../app.modules/assets/board/category/notice.svg';
import PersonalNoticeIcon from '../../../../app.modules/assets/board/category/personalNotice.svg';
import EducationIcon from '../../../../app.modules/assets/board/category/education.svg';
import CoverIcon from '../../../../app.modules/assets/board/category/cover.svg';
import QuestionIcon from '../../../../app.modules/assets/board/category/question.svg';
import TotalColorIcon from '../../../../app.modules/assets/board/category/color/total.svg';
import NoticeColorIcon from '../../../../app.modules/assets/board/category/color/notice.svg';
import PersonalNoticeColorIcon from '../../../../app.modules/assets/board/category/color/personalNotice.svg';
import EducationColorIcon from '../../../../app.modules/assets/board/category/color/education.svg';
import CoverColorIcon from '../../../../app.modules/assets/board/category/color/cover.svg';
import QuestionColorIcon from '../../../../app.modules/assets/board/category/color/question.svg';
import 'swiper/css';
import useStore from '../../store';

function BoardCategorySlider({ main = true, manager = false }) {
	const router = useRouter();
	const { formType, id } = router.query;

	const { selectedCategory, setSelectedCategory } = useStore();
	const [selectedCategoryView, setSelectedCategoryView] = useState('전체');
	const [categoryView, setCategoryView] = useState<Array<{ icon: any; colorIcon: any; category: string }>>([
		{ icon: PersonalNoticeIcon, colorIcon: PersonalNoticeColorIcon, category: '전달' },
		{ icon: CoverIcon, colorIcon: CoverColorIcon, category: '대타구함' },
		{ icon: QuestionIcon, colorIcon: QuestionColorIcon, category: '질문' },
	]);
	const handleCategoryClick = (category: string) => {
		setSelectedCategoryView(category);
		setSelectedCategory(category);
	};

	useEffect(() => {
		if (main) {
			setCategoryView([
				{ icon: TotalIcon, colorIcon: TotalColorIcon, category: '전체' },
				{ icon: NoticeIcon, colorIcon: NoticeColorIcon, category: '공지' },
				{ icon: PersonalNoticeIcon, colorIcon: PersonalNoticeColorIcon, category: '전달' },
				{ icon: EducationIcon, colorIcon: EducationColorIcon, category: '교육' },
				{ icon: CoverIcon, colorIcon: CoverColorIcon, category: '대타구함' },
				{ icon: QuestionIcon, colorIcon: QuestionColorIcon, category: '질문' },
			]);
		}
		if (manager) {
			setCategoryView([
				{ icon: NoticeIcon, colorIcon: NoticeColorIcon, category: '공지' },
				{ icon: PersonalNoticeIcon, colorIcon: PersonalNoticeColorIcon, category: '전달' },
				{ icon: EducationIcon, colorIcon: EducationColorIcon, category: '교육' },
				{ icon: CoverIcon, colorIcon: CoverColorIcon, category: '대타구함' },
				{ icon: QuestionIcon, colorIcon: QuestionColorIcon, category: '질문' },
			]);
		}
		setSelectedCategoryView(selectedCategory);
		return () => {
			setSelectedCategoryView('');
		};
	}, [manager, main, selectedCategory]);

	return (
		<div className="w-[calc(100%+4rem)] -translate-x-[2rem]">
			<Swiper
				pagination={{
					clickable: true,
				}}
				slidesPerView="auto"
				spaceBetween={main ? 8 : 10}
				slidesOffsetBefore={main ? 16 : 20}
				slidesOffsetAfter={main ? 16 : 20}
			>
				{categoryView.map(({ icon: Icon, colorIcon: ColorIcon, category }, index) => (
					<SwiperSlide key={index} style={{ width: main ? '64px' : '56px' }}>
						<div role="presentation" className="w-fit" onClick={() => handleCategoryClick(category)}>
							<div
								className={`${
									main ? 'w-[6.4rem] h-[6.4rem]' : 'w-[5.6rem] h-[5.6rem]'
								} flex justify-center items-center rounded-[0.8rem] ${
									selectedCategoryView === category ? 'bg-primarySub' : 'bg-g2'
								}`}
							>
								{selectedCategoryView === category ? <ColorIcon /> : <Icon />}
							</div>
							<div className="text-center mt-[0.6rem]">
								<span className={`text-body1 ${selectedCategoryView === category ? 'text-primary' : 'text-g8'}  `}>
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
