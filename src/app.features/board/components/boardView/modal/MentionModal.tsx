import React, { useEffect, useState } from 'react';
import TopModal from 'src/app.components/Modal/TopModal';
import ProfileImage from 'src/app.components/ProfileImage';
import { IBoardCheckPerson } from 'src/app.features/board/types';

interface Props {
	userList: IBoardCheckPerson[]; // TODO: any 삭제
	onMetionUserClick: (userCode: string, userName: string) => void;
	closeModal: () => void;
}

function MentionModal({ userList, onMetionUserClick, closeModal }: Props) {
	const [isPop, setIsPop] = useState<boolean>();
	useEffect(() => {
		setIsPop(true);
	}, []);
	return (
		<div
			aria-modal="true"
			className={`bg-g1 py-[1.6rem] h-[21rem] overflow-y-scroll scrollbar-hidden  rounded-t-[1.6rem] z-[99] fixed bottom-0 max-w-[50rem] px-[2rem] -translate-x-[2rem] mx-auto w-full transition-transform duration-500 ease-in-out ${
				isPop ? 'transform translate-y-0' : 'transform translate-y-full'
			}`}
		>
			<ul className="space-y-[1.6rem] pb-[6rem]">
				{userList?.map(({ userProfileCode, userCode, email, userName }: IBoardCheckPerson) => (
					<li className="flex items-center space-x-[0.8rem]" key={userCode}>
						<button
							onClick={(e) => {
								onMetionUserClick(userCode, userName);
								setIsPop(false);
								closeModal();
							}}
							className="flex items-center space-x-[0.8rem]"
							name="mention"
						>
							<ProfileImage userProfileCode={userProfileCode} size="xs" />
							<span className="text-subhead2 text-g9">{userName}</span>
							<span className="text-body2 text-g6">{email}</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default MentionModal;
