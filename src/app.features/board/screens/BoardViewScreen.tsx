/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
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
import { IBoardCheckPerson, IBoardViewData } from '../types';
import { formatDate } from '../utils';
import { DeleteCommentParam, PostCommentBody, PutCommentBody } from '../api/viewResponse';
import BoardViewHeader from '../components/boardView/Header';
import CommentEditScreen from './CommentEditScreen';
import MentionModal from '../components/boardView/modal/MentionModal';
// TODO: 멘션 기능 보완하기
interface Props {
	userData: {
		userName: string;
		userCode: number;
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
	}; // React.ChangeEvent<HTMLDivElement>
	const commentKeyboardHandler = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
		// TODO: 멘션 로직 분리
		// @입력
		if (e.key === '@') {
			if (storeFecthDisabled) {
				// metion 기능 최초실행시 fetch On
				setStoreFetchDisabled(false);

				storeRefetch();
			}
			openMentionModal();
		} else if (isMentionModalOpen) {
			closeMentiondModal();
		}
		// 방향키 입력
		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') return;
		const selection: any = window.getSelection();
		if (selection === null) return;
		const comment = commentRef.current;
		if (comment === null) return;

		// 멘션 수정 시도
		if (selection?.baseNode?.parentNode?.tagName === 'WS-MENTION') {
			// delete 키 입력
			if (e.keyCode === 8 || e.key === 'Backspace') {
				const $space = document.createTextNode('\u00A0');
				comment.replaceChild($space, selection.baseNode.parentNode);
				const range = document.createRange();
				range.setStart($space, 1);
				range.setEnd($space, 1);
				selection.removeAllRanges();
				selection.addRange(range);
			} else {
				// 멘션 영역 내부 키보드 입력
				// 멘션 삭제 처리
				comment.removeChild(selection.baseNode.parentNode);
			}
		}
	};
	const newCommentHandler = (e: React.FormEvent<HTMLParagraphElement>) => {};

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
		setMentionUserCodes((prev) => [...prev, userCode]);
		const newMention = `<ws-mention class="mention-text" contenteditable="false" data-index=${mentionUserCodes.length}>${userNameString}</ws-mention>`;
		const selection = window.getSelection();
		if (selection === null) return;

		const parser = new DOMParser();
		const mentionNode = parser.parseFromString(newMention, 'text/html').body.firstChild;
		if (mentionNode === null) return;
		const range = selection.getRangeAt(0);
		const previousNode = range.startContainer;
		if (previousNode?.textContent?.[range.startOffset - 1] === '@') {
			range.setStart(previousNode, range.startOffset - 1);
			range.setEnd(previousNode, range.startOffset + 1);
			console.log(range);
			range.deleteContents();
			range.insertNode(mentionNode);
			range.setStartAfter(mentionNode);
			range.setEndAfter(mentionNode);
			const space = document.createTextNode('\u00A0'); // unicode for non-breaking space
			range.insertNode(space);
			range.setStartAfter(space);
			range.setEndAfter(space);
			selection.removeAllRanges();
			selection.addRange(range);
			setCommentInputMode('wide');
			closeMentiondModal();
		}
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
	const PLACEHOLDER = '댓글을 입력해 주세요';
	useEffect(() => {
		const $comment = commentRef.current;
		if ($comment === null) return;
		if ($comment.innerText.length === 0) {
			$comment.innerHTML = PLACEHOLDER;
			$comment.style.color = '#9E9EA9';
		}
		const handleCommentFocusOut = () => {
			console.log($comment.innerText.length, $comment.innerText.toString());
			if ($comment.innerText.length === 0 || $comment.innerText === '\n') {
				// 두번째 조건은 사파리 대응
				$comment.innerHTML = PLACEHOLDER;
				$comment.style.color = '#9E9EA9';
				$comment.style.fontWeight = '400';
			}

			setCommentInputMode('small');
		};
		$comment.addEventListener('focusout', handleCommentFocusOut);
		// eslint-disable-next-line consistent-return
		return () => $comment.removeEventListener('focusout', handleCommentFocusOut);
	}, []);
	return (
		<>
			{mode !== 'edit' ? (
				<div className="h-full">
					<BoardViewHeader isMyPost={isMyPost} DelMutate={DelMutate} postId={boardViewData?.postId ?? null} />
					<main className=" pt-[1.6rem] h-[calc(100vh-5.6rem)] pb-[6rem] overflow-y-scroll scrollbar-hidden">
						<BoardContentView boardViewData={boardViewData} viewCheckHandler={viewCheckHandler} />
						<section className="py-[1.8rem]   space-y-[1.6rem]   ">
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
														aria-hidden={boardViewData?.userCode !== userData?.userCode}
														onClick={() => {
															setFocusComment({ commentId, content });
															openOptionModal();
														}}
														className="aria-hidden:hidden"
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
					</main>
					<footer
						className={`${
							commentInputMode === 'wide' ? '' : 'px-[2rem] py-[1.2rem]'
						} absolute w-full z-[150] flex items-center bg-w   -translate-x-[2rem] max-w-[50rem] mx-auto bottom-0   h-fit border-solid border-t-[0.05rem] border-g3`}
					>
						<div className={`relative w-full bg-g1 ${commentInputMode === 'small' ? 'rounded-[0.8rem]' : ''} `}>
							<div
								role="textbox"
								className={` ${
									commentInputMode === 'wide'
										? 'flex items-center pl-[2rem] pr-[5.2rem] my-[1rem] min-h-[4rem] max-h-[8rem]  '
										: 'rounded-[0.8rem] px-[1.2rem] py-[0.8rem] h-[3.6rem]  '
								}   scrollbar-hidden overflow-y-scroll `}
							>
								<p
									// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
									tabIndex={0}
									ref={commentRef}
									onKeyDown={commentKeyboardHandler}
									contentEditable
									onInput={newCommentHandler}
									onMouseDown={() => {
										const $comment = commentRef.current;
										if ($comment === null) return;
										if ($comment.innerText === PLACEHOLDER) {
											$comment.innerHTML = '';
											$comment.style.color = '#66666E';
											$comment.style.fontWeight = '500';
										}

										setCommentInputMode('wide');
										$comment.focus();
									}}
									className=" text-[1.4rem] leading-[2rem]  text-g9 w-full  outline-none"
								/>
							</div>
							{commentInputMode === 'wide' && (
								<button
									type="submit"
									onClick={newCommentSubmitHandler}
									className="absolute right-[1.6rem] top-1/2 -translate-y-1/2"
								>
									<SendCommentIcon />
								</button>
							)}
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
