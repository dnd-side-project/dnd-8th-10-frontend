import React from 'react';
import CrossIcon from 'src/app.modules/assets/cross.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import useImgModal from '../../store/imgModal';
import 'swiper/css/pagination';
import 'swiper/css';

function ImageModal({ imgData }: { imgData: string[] }) {
	const { modalIndex, imgModalIsClose } = useImgModal();

	return (
		<div className="flex flex-col justify-center translate-x-0 z-[101]  fixed max-w-[42rem] mx-auto inset-0 bg-black">
			<header className="z-50 absolute right-0 top-0 mx-[2rem] my-[2rem] flex justify-end">
				<button type="button" onClick={() => imgModalIsClose()}>
					<CrossIcon />
				</button>
			</header>
			<div>
				<Swiper initialSlide={modalIndex} slidesPerView={1} centeredSlides pagination modules={[Pagination]}>
					{imgData.map((_, index) => (
						<SwiperSlide key={index}>
							<div className="w-full min-h-[100vh] z-0 flex justify-center items-center">
								<img className="w-full" src={`data:image/png;base64,${imgData[index]}`} alt={String(index)} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default ImageModal;
