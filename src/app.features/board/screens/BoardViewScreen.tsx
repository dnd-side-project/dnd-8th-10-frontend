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
import BoardContentView from '../components/BoardContentView';
import { boardViewData } from '../types';

interface Props {
	id: string | string[] | undefined;
	boardViewData: boardViewData;
	DelMutate: MutateTpye<number>;
	boardViewReftch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<any, unknown>>;
}

function BoardViewScreen({ id, boardViewData, boardViewReftch, DelMutate }: Props) {
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const router = useRouter();
	const [delModalView, setDelModalView] = useState<boolean>(false);

	useEffect(() => {
		setDelModalView(false);
	}, [isModalOpen]);

	useEffect(() => {
		return () => modalIsClose();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			// 게시글 수정시 서버 반영 시간 대기해서 리패치, 이거 해결해야하는 문제.
			boardViewReftch();
		}, 100);
	}, [router.asPath]);

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
								router.push(`${SERVICE_URL.boardWrite}/${id}?formType=${'modify'}`);
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
