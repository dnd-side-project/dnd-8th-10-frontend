import React from 'react';
import CameraIcon from '../../../app.modules/assets/board/camera.svg';
import PlusIcon from '../../../app.modules/assets/board/plus.svg';

function BoardImageUpload({ onImageChange, previewUrls }: any) {
	return (
		<div className="flex">
			{previewUrls.map((url: string) => (
				<div
					key={url}
					className="mr-[0.8rem] w-[6.7rem] h-[6.7rem] bg-g1 rounded-[0.5rem] flex justify-center items-center"
				>
					<img src={url} alt={url} className="w-full h-full object-cover rounded-[0.5rem]" />
				</div>
			))}
			{previewUrls.length === 0 && (
				<div className="mr-[0.8rem] w-[6.7rem] h-[6.7rem] bg-g1 rounded-[0.5rem] flex justify-center items-center">
					<CameraIcon />
				</div>
			)}
			<div className="mr-[0.8rem] w-[6.7rem] h-[6.7rem] bg-g1 rounded-[0.5rem] flex justify-center items-center">
				<label htmlFor="image">
					<PlusIcon />
				</label>
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
		</div>
	);
}

export default BoardImageUpload;
