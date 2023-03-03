import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BoardModal from 'src/app.components/Modal/BoardModal';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import ProfileImage from 'src/app.components/ProfileImage';
import { MutateTpye } from 'src/app.modules/api/client';
import useModalStore from 'src/app.modules/store/modal';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import CommentSettingIcon from '../../../app.modules/assets/board/ellipsis.svg';
import BoardContentView from '../components/boardView/BoardContentView';
import { IBoardViewData, IComment } from '../types';
import { formatDate } from '../utils';
import { DeleteCommentParam, PostCommentBody, PutCommentBody } from '../api/viewResponse';
import BoardViewHeader from '../components/boardView/Header';
import CommentEditScreen from './CommentEditScreen';

interface Props {
	// id?: string | string[] | undefined;
	boardViewData: IBoardViewData;
	DelMutate: MutateTpye<number>;
	ViewCheckMutate: MutateTpye<number>;
	PostCommentMutate: MutateTpye<PostCommentBody>;
	DeleteCommentMutate: MutateTpye<DeleteCommentParam>;
	PutCommentMutate: MutateTpye<PutCommentBody>;
}
// TODO: 게시물 확인 버튼 api 연동(0)
// TODO: 백엔드 boardViewData에 해당 게시물을 체크했는지에 대한 필드 추가 됬는지 확인하기
// TODO: 댓글 멘션 관련 로직 논의
// TODO: 댓글 C(0),R(0),U,D
function BoardViewScreen({
	boardViewData,
	DelMutate,
	ViewCheckMutate,
	PostCommentMutate,
	DeleteCommentMutate,
	PutCommentMutate,
}: Props) {
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const router = useRouter();
	type SoryByType = 'earliest' | 'latest';
	type FocusCommentType = {
		commentId: number;
		content: string;
	};
	const [commentSortBy, setCommentSortBy] = useState<SoryByType>('earliest');
	const [newComment, setNewComment] = useState<string>('');
	const [commentInputMode, setCommentInputMode] = useState<'small' | 'wide'>('small');
	const [delCommentModalOpen, setDelCommentModalOpen] = useState<boolean>(false);
	const [optionModalOpen, setOptionModalOpen] = useState<boolean>(false);
	const [focusComment, setFocusComment] = useState<FocusCommentType | null>(null);
	const [isEditCommentMode, setIsEditcommentMode] = useState<boolean>(false);
	useEffect(() => {
		return () => modalIsClose();
	}, []);
	const commentSortHandler = (sortBy: SoryByType) => {
		setCommentSortBy(sortBy);
	};
	const viewCheckHandler = () => {
		const { postId } = boardViewData;
		if (!postId) return;
		console.log(postId);
		ViewCheckMutate(postId);
	};
	const sortedCommentList = () => {
		const { comments } = boardViewData;
		if (!comments) return [];
		if (commentSortBy === 'earliest') return comments;
		return [...comments].reverse();
	};
	const newCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewComment(e.target.value);
	};
	const newCommentSubmitHandler = () => {
		console.log(newComment);
		const { postId } = boardViewData;
		if (!newComment.trim() || !postId) return;
		console.log('adsfafd');
		const body = { postId, content: newComment };
		PostCommentMutate(body);
		setNewComment('');
	};
	const deleteCommentHandler = (commentId: number) => {
		console.log('삭제', commentId);
		const { postId } = boardViewData;
		if (!postId) return;
		const param = { postId, commentId };
		DeleteCommentMutate(param);
		setDelCommentModalOpen(false);
	};
	const commentEditHandler = (editComment: string) => {
		console.log('수정');
		const { postId } = boardViewData;
		if (!postId || focusComment === null) return;
		if (!editComment.trim()) return;
		const { commentId } = focusComment;
		const body = { postId, commentId, content: editComment };
		console.log(body);
		PutCommentMutate(body);
		setIsEditcommentMode(false);
	};
	useEffect(() => {
		setDelCommentModalOpen(false);
	}, [isModalOpen]);
	return (
		<>
			{!isEditCommentMode ? (
				<div>
					<BoardViewHeader DelMutate={DelMutate} postId={boardViewData?.postId ?? null} />
					<BoardContentView boardViewData={boardViewData} viewCheckHandler={viewCheckHandler} />
					<section className="pt-[1.8rem] pb-[5.4rem] space-y-[1.6rem]">
						<div className="flex items-center space-x-[0.4rem]">
							{[
								['earliest', '등록순'],
								['latest', '최신순'],
							].map(([value, display]) => (
								<button
									key={value}
									onClick={() => commentSortHandler(value as SoryByType)}
									name="sortBy"
									value={value}
									aria-pressed={commentSortBy === value}
									className="aria-pressed:text-g9 text-g6 text-subhead1"
								>
									{display}
								</button>
							))}
						</div>
						<ul className="space-y-[1.6rem]">
							{boardViewData &&
								sortedCommentList().map(({ commentId, content, userCode, userName, createdDate, role }) => (
									<li key={commentId} className="flex space-x-[0.8rem]">
										<ProfileImage userProfileCode={userCode} size="sm" />
										<div className="w-full">
											<div className="flex justify-between  items-center ">
												<div className="flex space-x-[0.4rem]">
													<span className="text-subhead1 text-g9">{userName}</span>
													<div className="text-body1 flex space-x-[0.4rem] text-g6">
														<span>{role === 'MANAGER' ? '점장' : '알바생'}</span>
														<span>{formatDate(createdDate)}</span>
													</div>
												</div>
												<button
													onClick={() => {
														setFocusComment({ commentId, content });
														setOptionModalOpen(true);
													}}
												>
													<CommentSettingIcon />
												</button>
											</div>
											<p className="text-body2 text-g9">{content}</p>
										</div>
									</li>
								))}
						</ul>
					</section>
					<footer
						className={`${
							commentInputMode === 'small' ? 'px-[2rem]' : ''
						} absolute w-full flex items-center -translate-x-[2rem] max-w-[42rem] mx-auto bottom-0  min-h-[5.6rem] h-fit border-solid border-t-[0.05rem] border-g3`}
					>
						<TextInput
							mode={commentInputMode}
							value={newComment}
							onChange={newCommentHandler}
							placeholder="댓글을 입력해 주세요"
							submitHandler={newCommentSubmitHandler}
							onBlur={() => setCommentInputMode('small')}
							onFocus={() => setCommentInputMode('wide')}
						/>
					</footer>
					{delCommentModalOpen && (
						<Overlay>
							<Modal
								title="삭제하시겠습니까?"
								yesFn={() => deleteCommentHandler(focusComment?.commentId as number)}
								yesTitle="삭제"
								noBtn
								noTitle="아니오"
							/>
						</Overlay>
					)}
					{optionModalOpen && (
						<Overlay>
							<BoardModal
								yesFn={() => {
									setIsEditcommentMode(true);
									setOptionModalOpen(false);
								}}
								noFn={() => {
									setOptionModalOpen(false);
									setDelCommentModalOpen(true);
								}}
							/>
						</Overlay>
					)}
				</div>
			) : (
				<CommentEditScreen commentEditHandler={commentEditHandler} prevComment={focusComment?.content as string} />
			)}
		</>
	);
}
export default BoardViewScreen;
