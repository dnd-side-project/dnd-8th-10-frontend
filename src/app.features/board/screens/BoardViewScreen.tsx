import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BoardModal from 'src/app.components/Modal/BoardModal';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import ProfileImage from 'src/app.components/ProfileImage';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useModalStore from 'src/app.modules/store/modal';
import BackIcon from '../../../app.modules/assets/back.svg';
import MoreIcon from '../../../app.modules/assets/more.svg';
import CommentSettingIcon from '../../../app.modules/assets/board/ellipsis.svg';
import BoardContentView from '../components/boardView/BoardContentView';
import { IBoardViewData } from '../types';
import { formatDate } from '../utils';

interface Props {
	// id?: string | string[] | undefined;
	boardViewData: IBoardViewData;
	DelMutate: MutateTpye<number>;
	ViewCheckMutate: MutateTpye<number>;
}
// TODO: 게시물 확인 버튼 api 연동
// TODO: 백엔드 boardViewData에 해당 게시물을 체크했는지에 대한 필드 추가 됬는지 확인하기
// TODO: 댓글 멘션 관련 로직 논의
// TODO: 댓글 C,R(0),U,D
function BoardViewScreen({ boardViewData, DelMutate, ViewCheckMutate }: Props) {
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const router = useRouter();
	const [delModalView, setDelModalView] = useState<boolean>(false);
	type SoryByType = 'earliest' | 'latest';
	const [commentSortBy, setCommentSortBy] = useState<SoryByType>('earliest');
	const [viewCheckCountOffset, setViewCheckCountOffset] = useState<0 | 1>(0);
	useEffect(() => {
		setDelModalView(false);
	}, [isModalOpen]);

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
	return (
		<div>
			<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
				<button type="button" onClick={() => router.back()}>
					<BackIcon stroke="#66666E" />
				</button>
				<button type="button" onClick={modalIsOpen}>
					<MoreIcon />
				</button>
			</header>
			<BoardContentView
				boardViewData={boardViewData}
				viewCheckHandler={viewCheckHandler}
				viewCheckCountOffset={viewCheckCountOffset}
			/>
			<section className="pt-[1.8rem] pb-[5.4rem] space-y-[1.6rem]">
				<div className="flex items-center space-x-[0.4rem]">
					{[
						['earliest', '등록순'],
						['latest', '최신순'],
					].map(([value, display]) => (
						<button
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
					{boardViewData?.comments?.map(({ commentId, content, userCode, userName, createdDate, role }) => (
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
									<CommentSettingIcon />
								</div>
								<p className="text-body2 text-g9">{content}</p>
							</div>
						</li>
					))}
				</ul>
			</section>
			{isModalOpen && (
				<Overlay>
					{delModalView ? (
						<Modal
							title="삭제하시겠습니까?"
							yesFn={() => DelMutate(Number(boardViewData.postId))}
							yesTitle="삭제"
							noBtn
							noTitle="아니오"
						/>
					) : (
						<BoardModal
							yesFn={() => {
								router.push(`${SERVICE_URL.boardEdit}/${boardViewData.postId}`);
							}}
							noFn={() => setDelModalView(true)}
						/>
					)}
				</Overlay>
			)}
		</div>
	);
}
export default BoardViewScreen;
