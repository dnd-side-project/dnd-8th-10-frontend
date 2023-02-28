import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import CorssIcon from '../../../app.modules/assets/board/cross.svg';
import BoardImageUpload from '../components/BoardImageUpload';
import BoardCategorySlider from '../components/slider/BoardCategorySlider';

function BoardWriteScreen() {
	const router = useRouter();
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
	const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		for (let i = 0; i < imageFiles.length; i += 1) {
			formData.append('imageFiles', imageFiles[i]);
		}
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			// 전송할 파일
			setImageFiles(Array.from(event.target.files));
			// 미리보기
			const imageUrls: string[] = [];
			for (let i = 0; i < event.target.files.length; i += 1) {
				imageUrls.push(URL.createObjectURL(event.target.files[i]));
			}
			setPreviewUrls(imageUrls);
		}
	};

	return (
		<div>
			<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
				<div role="presentation" onClick={() => router.back()}>
					<CorssIcon />
				</div>
				<span className="text-g10 text-subhead4 ml-[0.1rem]">글쓰기</span>
				<div className="w-[2.4rem]" />
			</header>
			<BoardCategorySlider />
			<div className="my-[1.2rem]">
				<BoardImageUpload onImageChange={handleImageChange} previewUrls={previewUrls} />
			</div>
			<form onSubmit={handleFormSubmit}>
				<div>
					<input
						className="w-full h-[4.8rem] bg-g1 rounded-[0.8rem] focus:outline-none px-[1.2rem] text-subhead2 text-g9"
						type="text"
						id="title"
						name="title"
						value={title}
						onChange={handleTitleChange}
					/>
				</div>
				<div className="mt-[0.8rem]">
					<textarea
						className="w-full h-[25rem] bg-g1 rounded-[0.8rem] focus:outline-none p-[1.2rem] text-subhead2 text-g9"
						id="content"
						name="content"
						value={content}
						onChange={handleContentChange}
						style={{ resize: 'none' }}
					/>
				</div>
				<div className="absolute w-full bottom-0 mb-[2rem]">
					<Bar type="button" disabled={title === '' || content === ''}>
						등록
					</Bar>
				</div>
			</form>
		</div>
	);
}
export default BoardWriteScreen;