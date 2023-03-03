import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { WriteBody, WriteImgBody } from '../api';
import useStore from '../store';
import { categoryMapEng, categoryMapKr } from '../utils';
import BoardImageUploadSlider from './slider/BoardImageUploadSlider';
import BoardCategorySlider from './slider/BoardCategorySlider';
import CorssIcon from '../../../app.modules/assets/board/cross.svg';
import { IBoardViewData } from '../types';

interface Props {
	id?: string | string[] | undefined;
	UserData: {
		role: string;
	};
	boardViewData?: IBoardViewData;
	BoardMutate: MutateTpye<WriteBody>;
	BoardWriteImgMutate: MutateTpye<WriteImgBody>;
}

function BoardEditor({ id, UserData, boardViewData, BoardMutate, BoardWriteImgMutate }: Props) {
	const router = useRouter();
	const { selectedCategory, setSelectedCategory } = useStore();
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
	const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);
	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (id && boardViewData) {
			// 게시글 수정
			BoardMutate({ postId: Number(id), title, content, category: categoryMapEng[selectedCategory] });
		} else {
			// 게시글 작성
			BoardMutate({ title, content, category: categoryMapEng[selectedCategory] });
		}
		// 이미지
		const formData = new FormData();
		for (let i = 0; i < imageFiles.length; i += 1) {
			formData.append('files', imageFiles[i]);
		}
		BoardWriteImgMutate({ postId: Number(id), files: formData });
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

	useEffect(() => {
		if (id && boardViewData) {
			setTitle(boardViewData.title);
			setContent(boardViewData.content);
			setSelectedCategory(categoryMapKr[boardViewData.category]);
		} else {
			setSelectedCategory('');
		}
		return () => {
			setSelectedCategory('전체');
		};
	}, [id, boardViewData]);

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
					<button type="button" onClick={() => router.back()}>
						<CorssIcon />
					</button>
					<span className="text-g10 text-subhead4 ml-[0.1rem]">{id && boardViewData ? '글쓰기 수정' : '글쓰기'}</span>
					<div>
						<button
							type="submit"
							className="disabled:text-g7 text-primary text-[1.4rem]"
							disabled={title === '' || content === '' || selectedCategory === ''}
						>
							{id && boardViewData ? '완료' : '등록'}
						</button>
					</div>
				</header>
				<BoardCategorySlider main={false} manager={UserData?.role === 'MANAGER'} />
				<div className="my-[1.2rem]">
					<BoardImageUploadSlider onImageChange={handleImageChange} previewUrls={previewUrls} />
				</div>
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
			</form>
		</div>
	);
}

export default BoardEditor;
