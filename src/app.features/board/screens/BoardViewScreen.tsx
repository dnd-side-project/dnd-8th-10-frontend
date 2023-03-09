/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useRouter } from 'next/router';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import BoardModal from 'src/app.components/Modal/BoardModal';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import ProfileImage from 'src/app.components/ProfileImage';
import { MutateTpye } from 'src/app.modules/api/client';
import TopModal from 'src/app.components/Modal/TopModal';
import CheckIcon from 'src/app.modules/assets/board/check.svg';
import useStore from 'src/app.modules/hooks/user/useStore';
import useModal from 'src/app.modules/hooks/useModal';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import SendCommentIcon from 'src/app.modules/assets/sendComment.svg';
import CommentSettingIcon from '../../../app.modules/assets/board/ellipsis.svg';
import BoardContentView from '../components/boardView/BoardContentView';
import { IBoardCheckPerson, IBoardViewData, IComment } from '../types';
import { formatDate } from '../utils';
import { DeleteCommentParam, PostCommentBody, PutCommentBody } from '../api/viewResponse';
import BoardViewHeader from '../components/boardView/Header';
import CommentEditScreen from './CommentEditScreen';
import MentionModal from '../components/boardView/modal/MentionModal';
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
// TODO: 백엔드 boardViewData에 해당 게시물을 체크했는지에 대한 필드 추가 됬는지 확인하기 (0)
// TODO: 댓글 멘션 관련 로직 논의 (0)
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
	const {
		isModalOpen: isMentionModalOpen,
		closeAnimationModal: closeMentiondModal,
		openModal: openMentionModal,
	} = useModal();
	const { isModalOpen: isOptionModalOpen, closeModal: closeOptionModal, openModal: openOptionModal } = useModal();

	const router = useRouter();
	type SoryByType = 'earliest' | 'latest';
	type FocusCommentType = {
		commentId: number;
		content: string;
	};
	// console.log(boardViewData);
	const commentRef = useRef<HTMLDivElement>(null);
	const [commentSortBy, setCommentSortBy] = useState<SoryByType>('earliest');
	const [commentInputMode, setCommentInputMode] = useState<'small' | 'wide'>('small');
	const [focusComment, setFocusComment] = useState<FocusCommentType | null>(null);
	const [isMyPost, setIsMyPost] = useState<boolean>(false);
	const [storeFecthDisabled, setStoreFetchDisabled] = useState<boolean>(true);
	const [mentionUserCodes, setMentionUserCodes] = useState<string[]>([]);
	const { data: storeInfo, refetch: storeRefetch } = useStore(true);
	const commentSortHandler = (sortBy: SoryByType) => {
		setCommentSortBy(sortBy);
	};
	const viewCheckHandler = () => {
		const { postId } = boardViewData;
		if (!postId) return;
		ViewCheckMutate(postId);
	};
	const sortedCommentList = () => {
		const { comments } = boardViewData;
		if (!comments) return [];
		if (commentSortBy === 'earliest') return comments;
		return [...comments].reverse();
	};
	const newCommentHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
		// TODO: 멘션 로직 분리
		// metion 기능 최초실행시 fetch On
		if (e.target.innerText.slice(-1) === '@') {
			if (storeFecthDisabled) {
				console.log('골뱅이');
				setStoreFetchDisabled(false);

				storeRefetch();
			}
			openMentionModal();
		} else if (isMentionModalOpen) {
			closeMentiondModal();
		}
	};

	const newCommentSubmitHandler = () => {
		const { postId } = boardViewData;
		// const content = newComments.join().trim();
		if (!postId) return;
		if (commentRef?.current === null) return;
		const mentionUserCodesBody = Array.from(new Set(mentionUserCodes));
		const body = { postId, content: commentRef.current.innerHTML as string, userCode: mentionUserCodesBody };
		console.log(body, 'post comment body');
		PostCommentMutate(body);

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
			setIsMyPost(boardViewData.userName === userData.userName);
		}
	}, [boardViewData, userData]);
	// 멘션할 유저 선택함
	const mentionUserHandler = (userCode: string, userName: string) => {
		if (commentRef?.current === null) return;
		const userNameString = `@${userName}`;
		// 코멘트 arr size 2 증가
		setMentionUserCodes((prev) => [...prev, userCode]);
		const newComment = `<ws-mention class="mention-text" data-index=${mentionUserCodes.length}>${userNameString}</ws-mention>`;
		// const prev = [...newComments];
		// prev[NEW_COMMENT_LAST_INDEX] = prev[NEW_COMMENT_LAST_INDEX].slice(0, -1);
		// setNewComments([...prev, newComment, ' ']);

		commentRef.current.innerHTML = `${commentRef.current.innerHTML.slice(0, -1)}${newComment}&nbsp;`;
		const selection = window.getSelection();
		console.log(window.getSelection()?.toString(), 'qqqq');
		const newRange = document.createRange();
		console.log(newRange);
		newRange.selectNodeContents(commentRef.current);
		newRange.collapse(false);
		console.log(newRange.endContainer);
		// newRange.setEnd(end);
		selection?.removeAllRanges();
		selection?.addRange(newRange);
		setCommentInputMode('wide');
		closeMentiondModal();
	};
	// TODO: 필터 적용하기
	const mentionUserList = () => storeInfo?.userList;
	// const mentionUserList = () =>
	//	storeInfo?.userList?.filter(({ userName }: IBoardCheckPerson) => {
	//		return userName.includes(newComments[NEW_COMMENT_LAST_INDEX].split('@').slice(-1).toString());
	//	});

	//= useEffect(() => {
	//	if (mentionRef?.current === null) return;
	// mentionRef.current.innerHTML = newComments.join();
	// }, [newComments]);
	const handleTextSelection = (event: BaseSyntheticEvent) => {
		const selectedText = window?.getSelection()?.toString();
		console.log(selectedText, window?.getSelection());
	};

	return (
		<>
			{mode !== 'edit' ? (
				<div>
					<BoardViewHeader isMyPost={isMyPost} DelMutate={DelMutate} postId={boardViewData?.postId ?? null} />
					<BoardContentView boardViewData={boardViewData} viewCheckHandler={viewCheckHandler} />
					<section className="pt-[1.8rem] pb-[5.4rem] space-y-[1.6rem] ">
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
											{/* eslint-disable-next-line react/no-danger */}
											<p dangerouslySetInnerHTML={{ __html: content }} className="text-body2 text-g9" />
										</div>
									</li>
								))}
						</ul>
					</section>

					<footer
						className={` absolute w-full z-[150] flex items-center bg-[#F8F8FA]  -translate-x-[2rem] max-w-[50rem] mx-auto bottom-0  min-h-[5.6rem] h-fit border-solid border-t-[0.05rem] border-g3`}
					>
						<div role="textbox" className="relative w-full   h-full px-[2rem]">
							<p
								ref={commentRef}
								onInput={newCommentHandler}
								contentEditable
								onFocus={() => setCommentInputMode('wide')}
								onBlur={() => setCommentInputMode('small')}
								placeholder="댓글을 입력해주세요"
								className=" text-body2   placeholder:text-g7 text-g9 w-full  outline-none"
							/>
							<button
								type="submit"
								onClick={newCommentSubmitHandler}
								className="absolute right-[1.6rem] top-1/2 -translate-y-1/2"
							>
								<SendCommentIcon />
							</button>
						</div>
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
					{isMentionModalOpen && mentionUserList()?.length && (
						<MentionModal userList={mentionUserList()} onMetionUserClick={mentionUserHandler} />
					)}
				</div>
			) : (
				<CommentEditScreen commentEditHandler={putCommentHandler} prevComment={focusComment?.content as string} />
			)}
		</>
	);
}
export default BoardViewScreen;
