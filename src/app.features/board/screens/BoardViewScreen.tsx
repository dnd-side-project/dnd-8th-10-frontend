import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Overlay from 'src/app.components/Modal/Overlay';
import ProfileImage from 'src/app.components/ProfileImage';
import { MutateTpye } from 'src/app.modules/api/client';
import TopModal from 'src/app.components/Modal/TopModal';
import CheckIcon from 'src/app.modules/assets/board/check.svg';
import useModal from 'src/app.modules/hooks/useModal';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import BoardContentView from '../components/boardView/BoardContentView';
import { WhoCheckPostType, IBoardViewData, FocusCommentType } from '../types';
import { DeleteCommentParamType, PostCommentBodyType, PutCommentBodyType } from '../api/comment';
import BoardViewHeader from '../components/boardView/Header';
import CommentEditScreen from './CommentEditScreen';
import CommentList from '../components/boardView/comment/CommentList';
import CommentForm from '../components/boardView/comment/CommentForm';
// TODO: 멘션 기능 보완하기
interface Props {
	userData: {
		userName: string;
		userCode: number;
	};
	boardViewData: IBoardViewData;
	boardCheckPerson: WhoCheckPostType[];
	DelMutate: MutateTpye<number>;
	ViewCheckMutate: MutateTpye<number>;
	PostCommentMutate: MutateTpye<PostCommentBodyType>;
	DeleteCommentMutate: MutateTpye<DeleteCommentParamType>;
	PutCommentMutate: MutateTpye<PutCommentBodyType>;
}

function BoardViewScreen({
	userData,
	boardViewData,
	DelMutate,
	ViewCheckMutate,
	PostCommentMutate,
	DeleteCommentMutate,
	PutCommentMutate,
	boardCheckPerson,
}: Props) {
	const {
		query: { mode },
	} = useRouter();

	const {
		isModalOpen: isWhoCheckedModalOpen,
		closeModal: closeWhoCheckedModal,
		openModal: openWhoCheckedModal,
	} = useModal();

	const router = useRouter();

	const IS_MYPOST = boardViewData?.userName === userData?.userName;
	const [focusedComment, setFocusedComment] = useState<FocusCommentType | null>(null);
	const viewCheckHandler = () => {
		const { postId } = boardViewData;
		if (!postId) return;
		ViewCheckMutate(postId);
	};
	const focusedCommentHandler = (commentId: number, content: string): void => {
		setFocusedComment({ commentId, content });
	};
	// 댓글 등록
	const newCommentSubmitHandler = (content: string, mentionUserCodes: number[]): void => {
		const { postId } = boardViewData;
		if (!postId) return;
		const mentionUserCodesBody = Array.from(new Set(mentionUserCodes));
		const body = { postId, content, userCode: mentionUserCodesBody };
		console.log(body, 'post comment body');
		PostCommentMutate(body);
	};

	// 댓글 삭제
	const deleteCommentHandler = (commentId: number): void => {
		const { postId } = boardViewData;
		if (!postId) return;
		const param = { postId, commentId };
		DeleteCommentMutate(param);
	};

	// 댓글 수정
	const putCommentHandler = (editComment: string): void => {
		console.log('수정');
		const { postId } = boardViewData;
		if (!postId || focusedComment === null) return;
		if (!editComment.trim()) return;
		const { commentId } = focusedComment;
		const body = { postId, commentId, content: editComment };
		PutCommentMutate(body);
		router.push(`${SERVICE_URL.boardView}/${postId}`);
	};

	return (
		<>
			{mode !== 'edit' ? (
				<div>
					<BoardViewHeader isMyPost={IS_MYPOST} DelMutate={DelMutate} postId={boardViewData?.postId ?? null} />
					<main className=" pt-[7.2rem] h-full pb-[6rem] ">
						<BoardContentView
							boardViewData={boardViewData}
							viewCheckHandler={viewCheckHandler}
							openWhoCheckedModal={openWhoCheckedModal}
						/>
						<CommentList
							boardViewData={boardViewData}
							userData={userData}
							onDeleteComment={deleteCommentHandler}
							focusedComment={focusedComment}
							onFocusedCommentChange={focusedCommentHandler}
						/>
					</main>
					<CommentForm onSubmitComment={newCommentSubmitHandler} />

					{isWhoCheckedModalOpen && (
						<Overlay overlayClickFn={closeWhoCheckedModal}>
							<TopModal>
								<div className="space-y-[2.4rem] pb-[12rem]">
									<div className="flex items-center space-x-[0.8rem] text-subhead2 text-g9">
										<CheckIcon stroke="#4382FF" />
										<span>이 게시글을 체크한 사람</span>
									</div>
									<ul className="space-y-[2.4rem]">
										{boardCheckPerson?.map(({ userProfileCode, email, userName }) => (
											<li className="flex items-center space-x-[0.8rem]">
												<ProfileImage userName={userName} userProfileCode={userProfileCode} size="xs" />
												<span className="text-subhead2 text-g9">{userName}</span>
												<span className="text-body2 text-g6">{email}</span>
											</li>
										))}
									</ul>
								</div>
							</TopModal>
						</Overlay>
					)}
				</div>
			) : (
				<CommentEditScreen
					commentEditHandler={putCommentHandler}
					prevComment={(() => {
						const htmlString = focusedComment?.content as string;
						const div = document.createElement('div');
						div.innerHTML = htmlString;
						return div.innerText;
					})()}
				/>
			)}
		</>
	);
}
export default BoardViewScreen;
