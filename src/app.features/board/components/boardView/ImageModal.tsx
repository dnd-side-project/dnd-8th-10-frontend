import React from 'react';
import CrossIcon from 'src/app.modules/assets/cross.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import useImgModal from '../../store/imgModal';
import NoImage from '../../../../../public/images/board/noImage.svg';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';

function ImageModal() {
	const { isImgModalOpen, imgModalIsClose } = useImgModal();
	return (
		<div className="flex flex-col justify-center items-center translate-x-0 z-50  fixed max-w-[42rem] mx-auto inset-0 bg-black">
			<header className=" absolute right-0  top-0 mx-[2rem] my-[2rem] flex justify-end">
				<button className="" type="button" onClick={() => imgModalIsClose()}>
					<CrossIcon />
				</button>
			</header>
			<div className="">
				<Swiper
					slidesPerView="auto"
					spaceBetween={8}
					slidesOffsetBefore={20}
					slidesOffsetAfter={15}
					pagination={true}
					modules={[Pagination]}
				>
					{[...new Array(2)].map((_, index) => (
						<SwiperSlide key={index} style={{ width: '225px' }}>
							<NoImage />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default ImageModal;
