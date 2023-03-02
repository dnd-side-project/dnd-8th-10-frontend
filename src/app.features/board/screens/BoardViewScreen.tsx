import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BoardModal from 'src/app.components/Modal/BoardModal';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useModalStore from 'src/app.modules/store/modal';
import BackIcon from '../../../app.modules/assets/back.svg';
import MoreIcon from '../../../app.modules/assets/more.svg';
import BoardContentView from '../components/boardView/BoardContentView';
import { boardViewDatas } from '../types';

interface Props {
	id: string | string[] | undefined;
	boardViewData: boardViewDatas;
	DelMutate: MutateTpye<number>;
}

function BoardViewScreen({ id, boardViewData, DelMutate }: Props) {
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const router = useRouter();
	const [delModalView, setDelModalView] = useState<boolean>(false);

	useEffect(() => {
		setDelModalView(false);
	}, [isModalOpen]);

	useEffect(() => {
		return () => modalIsClose();
	}, []);

	return (
		<div>
			<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
				<button type="button" onClick={() => router.back()}>
					<BackIcon stroke="#66666E" />
				</button>
				<button type="button" onClick={() => modalIsOpen()}>
					<MoreIcon />
				</button>
			</header>
			<BoardContentView id={id} boardViewData={boardViewData} />
			{/* 댓글 작업할 공간 */}
			{isModalOpen && (
				<Overlay>
					{delModalView ? (
						<Modal
							title="삭제하시겠습니까?"
							yesFn={() => DelMutate(Number(id))}
							yesTitle="삭제"
							noBtn
							noTitle="아니오"
						/>
					) : (
						<BoardModal
							yesFn={() => {
								router.push(`${SERVICE_URL.boardEdit}/${id}`);
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
