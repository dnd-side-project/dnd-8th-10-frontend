import React, { useEffect, useState } from 'react';
import TopModal from 'src/app.components/Modal/TopModal';
import ProfileImage from 'src/app.components/ProfileImage';
import { IBoardCheckPerson } from 'src/app.features/board/types';

interface Props {
	userList: IBoardCheckPerson[]; // TODO: any 삭제
	onMetionUserClick: (userCode: string, userName: string) => void;
}

function MentionModal({ userList, onMetionUserClick }: Props) {
	return (
		<TopModal bgColor="bg-g1" isAnimating>
			<div className="space-y-[2.4rem]">
				<ul className="space-y-[2.4rem] pb-[6rem]">
					{userList?.map(({ userProfileCode, userCode, email, userName }: IBoardCheckPerson) => (
						<li className="flex items-center space-x-[0.8rem]" key={userCode}>
							<button
								onClick={(e) => onMetionUserClick(userCode, userName)}
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
		</TopModal>
	);
}

export default MentionModal;
