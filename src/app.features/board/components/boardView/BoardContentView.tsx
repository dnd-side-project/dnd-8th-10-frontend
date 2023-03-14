import React, { useEffect, useState } from 'react';
import CheckIcon from 'src/app.modules/assets/board/check.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IBoardViewData } from '../../types';
import { categoryMapKr, formatDate } from '../../utils';
import useImgModal from '../../store/imgModal';
import ImageModal from './ImageModal';
import 'swiper/css';
import { boardImgLoad } from '../../api';

interface Props {
	boardViewData: IBoardViewData;
	viewCheckHandler: () => void;
}

function BoardContentView({ boardViewData, viewCheckHandler }: Props) {
	const { isImgModalOpen, imgModalIsOpen } = useImgModal();
	const [imgData, setImgData] = useState([]);
	useEffect(() => {
		if (boardViewData) {
			const data = boardImgLoad(boardViewData.postId);
			data.then((res) => {
				setImgData(res.data);
			});
		}
	}, [boardViewData]);

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
					<div className="flex w-[calc(100%+4rem)] -translate-x-[2rem] mb-[0.8rem]">
						<Swiper
							slidesPerView="auto"
							spaceBetween={imgData.length > 1 ? 8 : 0}
							slidesOffsetBefore={imgData.length > 1 ? 20 : 0}
							slidesOffsetAfter={imgData.length > 1 ? 15 : 0}
						>
							{imgData.map((_, index) => (
								<SwiperSlide key={index} style={{ width: '320px' }}>
									<button
										type="button"
										onClick={() => {
											imgModalIsOpen(index);
										}}
									>
										<img
											className="rounded-[0.8rem] w-[32rem] h-[20rem] object-cover"
											src={`data:image/png;base64,${imgData[index]}`}
											alt={String(index)}
										/>
									</button>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
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
			{isImgModalOpen && <ImageModal imgData={imgData} />}
		</section>
	);
}

export default BoardContentView;
