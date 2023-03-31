/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useRef, useState } from 'react';
import { IComment } from 'src/app.features/board/types';
import SendCommentIcon from 'src/app.modules/assets/sendComment.svg';
import useModal from 'src/app.modules/hooks/useModal';
import useStore from 'src/app.modules/hooks/user/useStore';
import MentionModal from '../modal/MentionModal';

interface Props {
	onSubmitComment: (newComment: string, mentionUserCodes: number[]) => void;
}
function CommentForm({ onSubmitComment }: Props) {
	const { data: storeInfo, refetch: storeRefetch } = useStore(true);
	const PLACEHOLDER = '댓글을 입력해 주세요';
	const {
		isModalOpen: isMentionModalOpen,
		closeAnimationModal: closeMentionModal,
		openModal: openMentionModal,
	} = useModal();
	const [storeFecthDisabled, setStoreFetchDisabled] = useState<boolean>(true);
	const commentRef = useRef<HTMLDivElement>(null);
	const commentWrapRef = useRef<HTMLDivElement>(null);
	const [commentInputMode, setCommentInputMode] = useState<'small' | 'wide'>('small');
	const [mentionUserCodes, setMentionUserCodes] = useState<IComment['userCode'][]>([]);
	const newCommentHandler = (e: React.FormEvent<HTMLParagraphElement>) => {
		const $comment = commentRef.current;
		if ($comment === null) return;
		if ($comment.innerText.slice(-1) === '@') {
			if (storeFecthDisabled) {
				// metion 기능 최초실행시 fetch On
				setStoreFetchDisabled(false);

				storeRefetch();
			}
			openMentionModal();
			$comment.focus();
		}
	};
	const commentKeyboardHandler = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
		// TODO: 멘션 로직 분리
		// @입력

		/* 
		else if (isMentionModalOpen) {
			closeMentiondModal();
		} */
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
	// 멘션할 유저 선택함
	const mentionUserHandler = (userCode: IComment['userCode'], userName: IComment['userName']) => {
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
		}
	};
	useEffect(() => {
		const $comment = commentRef.current;
		const $commentWrapper = commentWrapRef.current;
		if ($comment === null || $commentWrapper === null) return;
		if ($comment.innerText.trim().length === 0) {
			$comment.innerHTML = PLACEHOLDER;
			$comment.style.color = '#9E9EA9';
		}
		const handleCommentFocusOut = (e: any) => {
			const relatedTarget: any = e?.relatedTarget;
			const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			if (isSafari) {
				const selection: any = window.getSelection();
				if (selection === null) return;
				if (selection?.anchorNode?.id === 'newComment') return; //  댓글 전송 버튼 경우 처리 ,사파리의 경우
			} else if (relatedTarget?.name === 'submitComment') return; // 댓글 전송 버튼을 누른 경우,사파리 제외
			if (e?.target?.name === 'submitComment') return; // 댓글input 안 멘션 영역 누른 경우
			if (relatedTarget?.name === 'mention') return; // 멘션 모달에 멘션버튼 누른 경우
			if (e?.target?.id === 'newComment' && $comment.innerText.length) {
				$comment.focus();
				return;
			} // 그냥 댓글 인풋 영역 누른 경우
			if ($comment.innerText.length === 0 || $comment.innerText === '\n') {
				// 두번째 조건은 사파리 대응

				$comment.innerHTML = PLACEHOLDER;
				$comment.style.color = '#9E9EA9';
				$comment.style.fontWeight = '400';
				setCommentInputMode('small');
			}
		};
		$comment.addEventListener('focusout', handleCommentFocusOut);
		// eslint-disable-next-line consistent-return
		return () => $comment.removeEventListener('focusout', handleCommentFocusOut);
	}, []);
	useEffect(() => {
		if (commentInputMode === 'wide') {
			const $comment = commentRef.current;
			$comment?.focus();
		}
	}, [commentInputMode]);
	// TODO: 필터 적용하기
	const mentionUserList = () => storeInfo?.userList;
	return (
		<>
			<footer
				ref={commentWrapRef}
				className={`${
					commentInputMode === 'wide' ? '' : 'px-[2rem] py-[1.2rem]'
				} fixed w-full z-[100] flex items-center bg-w   -translate-x-[2rem] max-w-[50rem] mx-auto bottom-0   h-fit border-solid border-t-[0.05rem] border-g3`}
			>
				<div
					onMouseDown={() => {
						const $comment = commentRef.current;
						if ($comment === null) return;
						if ($comment.innerText === PLACEHOLDER) {
							$comment.innerHTML = '';
							$comment.style.color = '#66666E';
							$comment.style.fontWeight = '500';
						}

						setCommentInputMode('wide');
					}}
					className={`relative w-full bg-g1 ${commentInputMode === 'wide' ? '' : 'rounded-[0.8rem]'} `}
				>
					<div
						role="textbox"
						className={`w-full ${
							commentInputMode === 'wide'
								? 'pl-[2rem] pr-[5.2rem] my-[1rem] min-h-[4rem] max-h-[8rem]  '
								: 'rounded-[0.8rem] px-[1.2rem] py-[0.8rem] h-[3.6rem]  '
						}   scrollbar-hidden overflow-y-scroll flex`}
					>
						<p
							id="newComment"
							ref={commentRef}
							onInput={newCommentHandler}
							onKeyDown={commentKeyboardHandler}
							contentEditable={commentInputMode === 'wide'}
							className=" text-[1.4rem] leading-[2rem] my-auto  text-g9 w-full  outline-none"
						/>
					</div>
					{commentInputMode === 'wide' && (
						<button
							type="button"
							name="submitComment"
							onClick={(e) => {
								e.stopPropagation();
								const $comment = commentRef.current;
								if ($comment === null) return;
								if (!$comment.innerText.trim()) {
									$comment.focus();
									return;
								}
								onSubmitComment($comment.innerHTML as string, mentionUserCodes);
								setCommentInputMode('small');
								$comment.innerHTML = PLACEHOLDER;
								$comment.style.color = '#9E9EA9';
								$comment.style.fontWeight = '400';
								setMentionUserCodes([]);
							}}
							className="absolute right-[1.6rem] top-1/2 -translate-y-1/2"
						>
							<SendCommentIcon />
						</button>
					)}
				</div>
			</footer>

			{isMentionModalOpen && mentionUserList()?.length && (
				<MentionModal
					userList={mentionUserList()}
					onMetionUserClick={mentionUserHandler}
					closeModal={closeMentionModal}
				/>
			)}
		</>
	);
}

export default CommentForm;
