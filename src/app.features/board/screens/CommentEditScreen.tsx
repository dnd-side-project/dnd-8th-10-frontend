import React, { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';

interface Props {
	commentEditHandler: (newComment: string) => void;
	prevComment: string;
}

function CommentEditScreen({ commentEditHandler, prevComment }: Props) {
	const [newComment, setNewComment] = useState<string>('');
	const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNewComment(e.target.value);
	};
	return (
		<div>
			<Header title="댓글 수정">
				<button onClick={() => commentEditHandler(newComment)} className="text-primary text-subhead2">
					완료
				</button>
			</Header>
			<main className="h-[100vh] pt-[7.2rem]">
				<form>
					<textarea
						name="editComment"
						defaultValue={prevComment}
						onChange={changeHandler}
						className="w-full h-[13.4rem] outline-none resize-none bg-g1 rounded-[0.8rem] p-[1.2rem] text-g9 text-subhead2"
					/>
				</form>
			</main>
		</div>
	);
}

export default CommentEditScreen;
