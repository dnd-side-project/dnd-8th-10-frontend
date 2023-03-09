/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useRouter } from 'next/router';
import React, { BaseSyntheticEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
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
	const mentionRef = useRef<HTMLDivElement>(null);
	const [commentSortBy, setCommentSortBy] = useState<SoryByType>('earliest');
	const [newComments, setNewComments] = useState<string[]>(['']); // 초기화
	const [commentInputMode, setCommentInputMode] = useState<'small' | 'wide'>('small');
	const [focusComment, setFocusComment] = useState<FocusCommentType | null>(null);
	const [isMyPost, setIsMyPost] = useState<boolean>(false);
	const [storeFecthDisabled, setStoreFetchDisabled] = useState<boolean>(true);
	const [mentionUserCodes, setMentionUserCodes] = useState<string[]>([]);
	const { data: storeInfo, refetch: storeRefetch } = useStore(true);
	const NEW_COMMENT_LAST_INDEX = newComments.length - 1;
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
	// console.log(newComments);
	const newCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		// TODO: 멘션 로직 분리
		// metion 기능 최초실행시 fetch On
		//	console.log(NEW_COMMENT_LAST_INDEX, value, value.slice(-1), value.slice(-1) === '@', '골뱅인데...');
		if (value.slice(-1) === '@') {
			if (storeFecthDisabled) {
				console.log('골뱅이');
				setStoreFetchDisabled(false);

				storeRefetch();
			}
			openMentionModal();
		}
		if (mentionRef?.current === null) return;
		// 댓글 지워서 , 마지막 인덱스 value 크기 0됨. 앞 인덱스로 이동해야함
		if (value.length === 0) {
			if (newComments.length === 1) {
				setNewComments(['']); // 초기화
				mentionRef.current.innerHTML = '';
				return;
			}
			const prev = [...newComments];
			console.log(NEW_COMMENT_LAST_INDEX, 'asdf');
			prev.pop();
			console.log(prev, 'prev');

			if (prev.slice(-1)[0].includes('<ws-mention class="mention-text"')) {
				console.log('is metion');
				// @userName 발췌
				const mentionTag = prev.pop() as string;
				const tmp = mentionTag.split('</ws-mention>').slice(-2, -1)[0];
				const userName = tmp.split('@').slice(-1)[0];
				console.log(userName, 'mentionString');
				prev.push(`@${userName}`);
			}

			setNewComments(prev);
			mentionRef.current.innerHTML = `${prev.join('')}`;
			// mentionRef.current.innerHTML = `${prev.join('')}`;
			return;
		}

		// 마지막 index에서 수정 작업
		const prev = [...newComments];
		console.log(NEW_COMMENT_LAST_INDEX, 'asdf');
		prev[NEW_COMMENT_LAST_INDEX] = value;
		console.log(prev);

		setNewComments(prev);
		mentionRef.current.innerHTML = `${prev.join('')}`;

		/* if (value.length < newComment.length && newComment.length) {
			console.log(1);
			const tmp = `${(mentionRef.current.innerHTML as string).slice(
				0,
				(mentionRef.current.innerHTML as string).length - (newComment.length - value.length)
			)}`;
			if (value.length) {
				// 멘션지점일 경우
				console.log(2);

				if (tmp.split('<span').slice(-1).toString().includes('class="mention-text"') && tmp.endsWith('</span')) {
					console.log(3);
					tmpCommentRef.current = '';
					const lastMetionToText = value;
					console.log('멘션지점임22', `${tmp.split('<span').slice(0, -1).join('<span')}`, lastMetionToText);

					setNewComment(lastMetionToText);
					// console.log(, 'test');
					// mentionRef.current.innerHTML = tmp;
					mentionRef.current.innerHTML = `${tmp.split('<span').slice(0, -1).join('<span')}${lastMetionToText}`;
					tmpCommentRef.current = tmp.split('<span').slice(0, -1).join('<span');
				} else {
					console.log(4, value, value.length, newComment.length);
					setNewComment(value);
					if (tmpCommentRef.current === '' && mentionRef.current.innerHTML) {
						console.log(mentionRef.current.innerHTML, value, '4-1');
						tmpCommentRef.current = `${mentionRef.current.innerHTML ?? ''}`;
					}
					mentionRef.current.innerHTML = `${tmpCommentRef.current}${value}`;
				}
			}
			if (value.length === 0) {
				console.log(5);
				if (tmp === '') {
					setNewComment('');

					mentionRef.current.innerHTML = ``;
					tmpCommentRef.current = mentionRef.current.innerHTML;
					return;
				}
				console.log(tmp, 'tmp', tmp.split('<span'), tmp.split('<span').slice(-1).toString());
				// 멘션지점일 경우
				if (tmp.split('<span').slice(-1).toString().includes('class="mention-text"') && tmp.endsWith('</span>')) {
					console.log(6);
					const lastMetionToText = `@${tmp.split('</span>').slice(-2)[0].split('@').slice(-1).join()}`;
					setNewComment(lastMetionToText);
					console.log('멘션지점임', 3, lastMetionToText);
					// console.log(, 'test');
					mentionRef.current.innerHTML = tmp;
					// mentionRef.current.innerHTML = `${tmp.split('<span').slice(0, -1).join('<span')}<span>${lastMetionToText}`;
					tmpCommentRef.current = tmp;
				} else {
					console.log(7);
					tmpCommentRef.current = '';
					const lastMetionToText = `${tmp.split('</span>').slice(-1)[0]}`;
					// 멘션 지점 아님
					console.log(
						'멘션지점 아님',
						tmp,
						lastMetionToText.length,
						`${tmp.split('</span>').slice(0, -1).join('</span>')}</span>`,
						'ㅅㄷㅅㄷㅅㄷ'
					);
					setNewComment(lastMetionToText);
					mentionRef.current.innerHTML =
						tmp.split('</span>').length === 1
							? tmp
							: `${tmp.split('</span>').slice(0, -1).join('</span>')}</span>${lastMetionToText}`;
					tmpCommentRef.current = mentionRef.current.innerHTML;
				}
			}
		} else {
			console.log(6);
			console.log(tmpCommentRef);
			if (tmpCommentRef.current === '' && mentionRef.current.innerHTML) {
				console.log(mentionRef.current.innerHTML, value, '입장3');
				// tmpCommentRef.current = `${mentionRef.current.innerHTML ?? ''}${value}`;
			}
			setNewComment(value);
			mentionRef.current.innerHTML = `${tmpCommentRef.current}${value}`;
		} */
	};

	const newCommentSubmitHandler = () => {
		/* console.log(newComments, '댓글 post');
		const { postId } = boardViewData;
		// const content = newComments.join().trim();
		if (!newComment.trim() || !postId) return;
		console.log('adsfafd');
		const mentionUserCodesBody = Array.from(new Set(mentionUserCodes));
		const body = { postId, content: mentionRef.current?.innerHTML as string, userCode: mentionUserCodesBody };
		console.log(body, 'bodybody');
		PostCommentMutate(body);
		setNewComment('');
		setMentionUserCodes([]); */
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
		if (mentionRef?.current === null) return;
		const userNameString = `@${userName}`;
		// 코멘트 arr size 2 증가
		setMentionUserCodes((prev) => [...prev, userCode]);
		const newComment = `<ws-mention class="mention-text" data-index=${mentionUserCodes.length}>${userNameString}</ws-mention>`;
		const prev = [...newComments];
		prev[NEW_COMMENT_LAST_INDEX] = prev[NEW_COMMENT_LAST_INDEX].slice(0, -1);
		setNewComments([...prev, newComment, ' ']);

		mentionRef.current.innerHTML = `${prev.join('')}${newComment}`;
		setCommentInputMode('wide');
		closeMentiondModal();
	};
	const mentionUserList = () =>
		storeInfo?.userList?.filter(({ userName }: IBoardCheckPerson) => {
			return userName.includes(newComments[NEW_COMMENT_LAST_INDEX].split('@').slice(-1).toString());
		});

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
					<div role="textbox" contentEditable onKeyDown={} onMouseUp={handleTextSelection}>
						<p ref={mentionRef} className=" text-body2   placeholder:text-g7 text-g9 w-full px-[3.2rem]" />
					</div>
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
						className={`${
							commentInputMode === 'small' ? 'px-[2rem]' : ''
						} absolute w-full z-[150] flex items-center -translate-x-[2rem] max-w-[50rem] mx-auto bottom-0  min-h-[5.6rem] h-fit border-solid border-t-[0.05rem] border-g3`}
					>
						<TextInput
							mode={commentInputMode}
							value={newComments[NEW_COMMENT_LAST_INDEX]}
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
