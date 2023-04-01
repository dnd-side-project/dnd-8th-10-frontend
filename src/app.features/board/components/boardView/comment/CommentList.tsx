import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BoardModal from 'src/app.components/Modal/BoardModal';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import ProfileImage from 'src/app.components/ProfileImage';
import { FocusCommentType, IBoardViewData } from 'src/app.features/board/types';
import { formatDate } from 'src/app.features/board/utils';
import useModal from 'src/app.modules/hooks/useModal';
import CommentSettingIcon from 'src/app.modules/assets/board/ellipsis.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

interface Props {
	boardViewData: IBoardViewData;
	userData: {
		userName: string;
		userCode: number;
	}; // TODO:
	onDeleteComment: (commentId: number) => void;
	focusedComment: FocusCommentType | null; // TODO:
	onFocusedCommentChange: (commentId: number, content: string) => void;
}
function CommentList({ boardViewData, userData, onDeleteComment, focusedComment, onFocusedCommentChange }: Props) {
	const router = useRouter();
	type SoryByType = 'earliest' | 'latest';

	const {
		isModalOpen: isDelCommentModalOpen,
		closeModal: closeDelCommentModal,
		openModal: openDelCommentModal,
	} = useModal();
	const { isModalOpen: isOptionModalOpen, closeModal: closeOptionModal, openModal: openOptionModal } = useModal();
	const [commentSortBy, setCommentSortBy] = useState<SoryByType>('earliest');

	const commentSortHandler = (sortBy: SoryByType) => {
		setCommentSortBy(sortBy);
	};
	const sortedCommentList = () => {
		const { comments } = boardViewData;
		if (!comments) return [];
		if (commentSortBy === 'earliest') return comments;
		return [...comments].reverse();
	}; // React.ChangeEvent<HTMLDivElement>
	return (
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
			</div>
			<ul className="space-y-[1.6rem]">
				{boardViewData &&
					sortedCommentList().map(({ commentId, content, userCode, userProfileCode, userName, createdDate, role }) => (
						<li key={commentId} className="flex space-x-[0.8rem]">
							<ProfileImage userName={userName} userProfileCode={userProfileCode} size="sm" />
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
										aria-hidden={userCode !== userData?.userCode}
										onClick={() => {
											onFocusedCommentChange(commentId, content);
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
			{isDelCommentModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeDelCommentModal();
					}}
				>
					<Modal
						title="삭제하시겠습니까?"
						yesFn={() => {
							onDeleteComment(focusedComment?.commentId as number);
							closeDelCommentModal();
						}}
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
		</section>
	);
}

export default CommentList;
