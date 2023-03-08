import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BoardModal from 'src/app.components/Modal/BoardModal';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import ProfileImage from 'src/app.components/ProfileImage';
import { MutateTpye } from 'src/app.modules/api/client';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import TopModal from 'src/app.components/Modal/TopModal';
import CheckIcon from 'src/app.modules/assets/board/check.svg';
import useStore from 'src/app.modules/hooks/user/useStore';
import useModal from 'src/app.modules/hooks/useModal';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import CommentSettingIcon from '../../../app.modules/assets/board/ellipsis.svg';
import BoardContentView from '../components/boardView/BoardContentView';
import { IBoardCheckPerson, IBoardViewData, IComment } from '../types';
import { formatDate } from '../utils';
import { DeleteCommentParam, PostCommentBody, PutCommentBody } from '../api/viewResponse';
import BoardViewHeader from '../components/boardView/Header';
import CommentEditScreen from './CommentEditScreen';
// TODO: 멘션 기능 보완하기
interface Props {
	userData: {
		userName: string;
	};
	boardViewData: IBoardViewData;
	boardCheckPerson: IBoardCheckPerson[];
	DelMutate: MutateTpye<number>;
	ViewCheckMutate: MutateTpye<number>;
	PostCommentMutate: MutateTpye<PostCommentBody>;
	DeleteCommentMutate: MutateTpye<DeleteCommentParam>;
	PutCommentMutate: MutateTpye<PutCommentBody>;
}
// TODO: 게시물 확인 버튼 api 연동(0)
// TODO: 백엔드 boardViewData에 해당 게시물을 체크했는지에 대한 필드 추가 됬는지 확인하기
// TODO: 댓글 멘션 관련 로직 논의
// TODO: 댓글 C(0),R(0),U(0),D(0)
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
	const { isModalOpen: isMentionModalOpen, closeModal: closeMentionModal, openModal: openMentionModal } = useModal();
	const {
		isModalOpen: isDelCommentModalOpen,
		closeModal: closeDelCommentModal,
		openModal: openDelCommentModal,
	} = useModal();
	const {
		isModalOpen: isWhoCheckedModalOpen,
		closeModal: closeWhoCheckedModal,
		openModal: openWhoCheckedModal,
	} = useModal();
	const { isModalOpen: isOptionModalOpen, closeModal: closeOptionModal, openModal: openOptionModal } = useModal();
	console.log(boardViewData);
	const router = useRouter();
	type SoryByType = 'earliest' | 'latest';
	type FocusCommentType = {
		commentId: number;
		content: string;
	};
	const [commentSortBy, setCommentSortBy] = useState<SoryByType>('earliest');
	const [newComment, setNewComment] = useState<string>('');
	const [commentInputMode, setCommentInputMode] = useState<'small' | 'wide'>('small');

	const [focusComment, setFocusComment] = useState<FocusCommentType | null>(null);
	const [myPost, setMyPost] = useState<boolean>(false);
	const [canStoreFecth, setCanStoreFetch] = useState<boolean>(true);
	const [mentionUserCodes, setMentionUserCodes] = useState<string[]>([]);
	const { data: storeInfo, refetch: storeRefetch } = useStore(canStoreFecth);
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
		const { value } = e.target;
		if (value.slice(-1) === '@') {
			console.log(storeInfo);
			setCanStoreFetch(true);
			storeRefetch();
			openMentionModal();
		} else if (isMentionModalOpen) {
			closeMentionModal();
		}
		setNewComment(value);
	};
	const newCommentSubmitHandler = () => {
		console.log(newComment, '댓글 post');
		const { postId } = boardViewData;
		if (!newComment.trim() || !postId) return;
		console.log('adsfafd');
		const mentionUserCodesBody = Array.from(new Set(mentionUserCodes));
		const body = { postId, content: newComment, userCode: mentionUserCodesBody };
		console.log(body, 'bodybody');
		PostCommentMutate(body);
		setNewComment('');
		setMentionUserCodes([]);
	};
	const deleteCommentHandler = (commentId: number) => {
		console.log('삭제', commentId);
		const { postId } = boardViewData;
		if (!postId) return;
		const param = { postId, commentId };
		DeleteCommentMutate(param);
		closeDelCommentModal();
	};
	const putCommentHandler = (editComment: string) => {
		console.log('수정');
		const { postId } = boardViewData;
		if (!postId || focusComment === null) return;
		if (!editComment.trim()) return;
		const { commentId } = focusComment;
		const body = { postId, commentId, content: editComment };
		console.log(body);
		PutCommentMutate(body);
		closeOptionModal();
		router.push(`${SERVICE_URL.boardView}/${postId}`);
	};

	useEffect(() => {
		if (boardViewData && userData) {
			setMyPost(boardViewData.userName === userData.userName);
		}
	}, [boardViewData, userData]);
	console.log(storeInfo);
	return (
		<>
			{mode !== 'edit' ? (
				<div>
					<BoardViewHeader myPost={myPost} DelMutate={DelMutate} postId={boardViewData?.postId ?? null} />
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
							<button
								onClick={() => {
									openWhoCheckedModal();
								}}
								className="aria-pressed:text-g9 text-g6 text-subhead1"
							>
								체크한사람확인 임시 버튼
							</button>
						</div>
						<ul className="space-y-[1.6rem]">
							{boardViewData &&
								sortedCommentList().map(({ commentId, content, userProfileCode, userName, createdDate, role }) => (
									<li key={commentId} className="flex space-x-[0.8rem]">
										<ProfileImage userProfileCode={userProfileCode} size="sm" />
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
														openOptionModal();
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
						} absolute w-full z-[100] flex items-center -translate-x-[2rem] max-w-[50rem] mx-auto bottom-0  min-h-[5.6rem] h-fit border-solid border-t-[0.05rem] border-g3`}
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
					{isDelCommentModalOpen && (
						<Overlay
							overlayClickFn={() => {
								closeDelCommentModal();
							}}
						>
							<Modal
								title="삭제하시겠습니까?"
								yesFn={() => deleteCommentHandler(focusComment?.commentId as number)}
								yesTitle="삭제"
								noFn={closeDelCommentModal}
								noTitle="아니오"
							/>
						</Overlay>
					)}
					{isOptionModalOpen && (
						<Overlay
							overlayClickFn={() => {
								closeOptionModal();
							}}
						>
							<BoardModal
								yesFn={() => {
									router.push(`${SERVICE_URL.boardView}/${boardViewData.postId}?mode=edit`);
									closeOptionModal();
								}}
								noFn={() => {
									closeOptionModal();
									openDelCommentModal();
								}}
								cancelFn={closeOptionModal}
							/>
						</Overlay>
					)}
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
												<ProfileImage userProfileCode={userProfileCode} size="xs" />
												<span className="text-subhead2 text-g9">{userName}</span>
												<span className="text-body2 text-g6">{email}</span>
											</li>
										))}
									</ul>
								</div>
							</TopModal>
						</Overlay>
					)}
					{isMentionModalOpen && (
						<Overlay overlayClickFn={closeWhoCheckedModal}>
							<TopModal>
								<div className="space-y-[2.4rem]">
									<ul className="space-y-[2.4rem] pb-[6rem]">
										{storeInfo?.userList?.map(({ userProfileCode, userCode, email, userName }: IBoardCheckPerson) => (
											<li className="flex items-center space-x-[0.8rem]" key={userCode}>
												<button
													onClick={() => {
														setMentionUserCodes((prev) => [...prev, userCode]);
														setNewComment((prev) => prev + userName);
														closeMentionModal();
													}}
													className="flex items-center space-x-[0.8rem]"
												>
													<ProfileImage userProfileCode={userProfileCode} size="xs" />
													<span className="text-subhead2 text-g9">{userName}</span>
													<span className="text-body2 text-g6">{email}</span>
												</button>
											</li>
										))}
									</ul>
								</div>
							</TopModal>
						</Overlay>
					)}
				</div>
			) : (
				<CommentEditScreen commentEditHandler={putCommentHandler} prevComment={focusComment?.content as string} />
			)}
		</>
	);
}
export default BoardViewScreen;
