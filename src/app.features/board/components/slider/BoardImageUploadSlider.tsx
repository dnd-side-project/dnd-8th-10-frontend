import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CameraIcon from '../../../app.modules/assets/board/camera.svg';
import 'swiper/css';

function BoardImageUploadSlider({ onImageChange, previewUrls }: any) {
	return (
		<div className="flex w-[calc(100%+4rem)] -translate-x-[2rem] pl-[2rem]">
			<label htmlFor="image">
				<div className="cursor-pointer mr-[0.8rem] w-[6.7rem] h-[6.7rem] bg-g1 rounded-[0.5rem] flex justify-center items-center">
					<CameraIcon />
				</div>
			</label>
			<div className="overflow-hidden">
				<Swiper slidesPerView="auto" spaceBetween={8} slidesOffsetAfter={20}>
					{previewUrls.map((url: string) => (
						<SwiperSlide key={url} style={{ width: '67px' }}>
							<div className="w-[6.7rem] h-[6.7rem]">
								<img src={url} alt={url} className="w-full h-full object-cover rounded-[0.5rem]" />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<input
				type="file"
				id="image"
				name="image"
				accept="image/png, image/jpeg"
				onChange={onImageChange}
				multiple
				className="opacity-0 w-0 h-0"
			/>
		</div>
	);
}

export default BoardImageUploadSlider;
