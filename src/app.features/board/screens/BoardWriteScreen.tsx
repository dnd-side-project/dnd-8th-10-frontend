import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import CorssIcon from '../../../app.modules/assets/board/cross.svg';
import { WriteBody } from '../api';
import BoardImageUpload from '../components/BoardImageUpload';
import BoardCategorySlider from '../components/slider/BoardCategorySlider';
import useStore from '../store';
import { boardViewDatas } from '../types';
import { categoryMapEng, categoryMapKr } from '../utils';

interface Props {
	id: string | string[] | undefined;
	formType: string | string[] | undefined;
	UserData: {
		role: string;
	};
	boardViewData: boardViewDatas;
	BoardWriteMutate: MutateTpye<WriteBody>;
	BoardModifyMutate: MutateTpye<WriteBody>;
}

function BoardWriteScreen({ id, formType, UserData, boardViewData, BoardWriteMutate, BoardModifyMutate }: Props) {
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
		// 게시글 작성
		if (formType === 'create') {
			BoardWriteMutate({ title, content, category: categoryMapEng[selectedCategory] });
		} else {
			// 게시글 수정
			BoardModifyMutate({ postId: Number(id), title, content, category: categoryMapEng[selectedCategory] });
		}
		// 이미지
		// const formData = new FormData();
		// for (let i = 0; i < imageFiles.length; i += 1) {
		// 	formData.append('imageFiles', imageFiles[i]);
		// }
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
		// 수정 페이지면 게시글 데이터 불러오기
		if (formType === 'modify') {
			setSelectedCategory(categoryMapKr[boardViewData.category]);
			setTitle(boardViewData.title);
			setContent(boardViewData.content);
		}
	}, [formType]);

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
					<button type="button" onClick={() => router.back()}>
						<CorssIcon />
					</button>
					<span className="text-g10 text-subhead4 ml-[0.1rem]">{formType === 'create' ? '글쓰기' : '글쓰기 수정'}</span>
					<div>
						<button
							type="submit"
							className="disabled:text-g7 text-primary text-[1.4rem]"
							disabled={title === '' || content === '' || selectedCategory === ''}
						>
							{formType === 'create' ? '등록' : '완료'}
						</button>
					</div>
				</header>
				<BoardCategorySlider main={false} manager={UserData?.role === 'MANAGER'} />
				<div className="my-[1.2rem]">
					<BoardImageUpload onImageChange={handleImageChange} previewUrls={previewUrls} />
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
export default BoardWriteScreen;
