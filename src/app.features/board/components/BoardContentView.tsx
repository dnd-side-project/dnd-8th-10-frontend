import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ViewImgIcon from '../assets/viewImg.svg';
import CheckIcon from '../../../app.modules/assets/board/check.svg';
import { categoryMapKr, formatDate } from '../utils';

interface Props {
	id: string | string[] | undefined;
	boardViewData: {
		category: string;
		checkCount: number;
		comments: string[];
		content: string;
		createDate: string;
		modifiedDate: string;
		postId: number;
		role: string;
		title: string;
		userCode: number;
		userName: string;
		viewCount: number;
	};
}

function BoardContentView({ id, boardViewData }: Props) {
	return (
		<div>
			{boardViewData && (
				<>
					<div className="mb-[1.6rem]">
						<div className="flex items-center">
							<span className="text-subhead2 text-g9">{boardViewData.title}</span>
						</div>
						<div className="mt-[0.2rem]">
							<span className="text-secondary text-body1 mr-[0.7rem]">{categoryMapKr[boardViewData.category]}</span>
							<span className="text-body1 text-g7">
								{boardViewData.userName} {boardViewData.role === 'MANAGER' ? '점장' : '알바생'}{' '}
								{formatDate(boardViewData.createDate)}
							</span>
						</div>
					</div>
					{/* <div className="w-[calc(100%+4rem)] -translate-x-[2rem] mb-[0.8rem]">
				<Swiper slidesPerView="auto" spaceBetween={8} slidesOffsetBefore={20} slidesOffsetAfter={15}>
					{[...new Array(3)].map((_, index) => (
						<SwiperSlide key={index} style={{ width: '320px' }}>
							<ViewImgIcon />
						</SwiperSlide>
					))}
				</Swiper>
			</div> */}
					<div className="mb-[2.4rem]">
						<span className="text-body2 text-g9">{boardViewData.content}</span>
					</div>
					<div className="flex text-body-long2 text-g6 pb-[1.2rem] border-solid border-b-[0.05rem] border-b-g3">
						<div className="mr-[0.8rem] flex items-center">
							<CheckIcon />
							<span className="ml-[0.4rem]">{boardViewData.checkCount}</span>
						</div>
						<div>조회 {boardViewData.viewCount}</div>
					</div>
				</>
			)}
		</div>
	);
}

export default BoardContentView;
