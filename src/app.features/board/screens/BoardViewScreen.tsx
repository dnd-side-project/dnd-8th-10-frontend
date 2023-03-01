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
import { WriteBody } from '../api';
import BoardContentView from '../components/BoardContentView';

interface Props {
	id: string | string[] | undefined;
	boardViewData: MutateTpye<WriteBody> | unknown;
	DelMutate: MutateTpye<number>;
}

function BoardViewScreen({ id, boardViewData, DelMutate }: Props) {
	const { isModalOpen, modalIsOpen } = useModalStore();
	const router = useRouter();
	const [delModalView, setDelModalView] = useState<boolean>(false);

	useEffect(() => {
		setDelModalView(false);
	}, [isModalOpen]);
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
			<BoardContentView id={id} />
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
