import React, { useState } from 'react';

function BoardWriteScreen() {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [image, setImage] = useState<File | null>(null);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
	const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0]);
		}
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		if (image) {
			formData.append('image', image);
		}
	};

	return (
		<div>
			<h1>글쓰기 페이지</h1>
			<form onSubmit={handleFormSubmit}>
				<div>
					<label htmlFor="title">제목</label>
					<input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
				</div>
				<div>
					<label htmlFor="content">내용</label>
					<textarea
						id="content"
						name="content"
						value={content}
						onChange={handleContentChange}
						style={{ resize: 'none' }}
					/>
				</div>
				<div>
					<label htmlFor="image">이미지</label>
					<input
						multiple
						type="file"
						id="image"
						name="image"
						accept="image/png, image/jpeg"
						onChange={handleImageChange}
					/>
				</div>
				<button type="submit">등록</button>
			</form>
		</div>
	);
}
export default BoardWriteScreen;
