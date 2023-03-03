import React from 'react';
import CheckIcon from 'src/app.modules/assets/board/check.svg';
import { IBoardViewData } from '../../types';
import { categoryMapKr, formatDate } from '../../utils';

interface Props {
	boardViewData: IBoardViewData;
	viewCheckHandler: () => void;
}

function BoardContentView({ boardViewData, viewCheckHandler }: Props) {
	return (
		<section>
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
					<div className="flex items-center text-body-long2 text-g6 pb-[1.2rem] border-solid border-b-[0.05rem] space-x-[0.8rem] border-b-g3">
						<button
							onClick={viewCheckHandler}
							className={`flex items-center  justify-center space-x-[0.4rem] bg-g1 px-[0.8rem] py-[0.5rem] rounded-[0.4rem] ${
								boardViewData?.check ? 'text-primary' : ''
							}`}
						>
							<CheckIcon stroke={boardViewData?.check ? '#4382FF' : '#B2B2BC'} />
							<span className="leading-[100%]">{boardViewData.checkCount}</span>
						</button>
						<div>조회 {boardViewData.viewCount}</div>
					</div>
				</>
			)}
		</section>
	);
}

export default BoardContentView;
