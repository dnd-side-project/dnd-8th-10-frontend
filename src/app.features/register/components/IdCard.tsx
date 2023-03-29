import React from 'react';
import ManagerCardGraphic from 'src/app.modules/assets/register/completeManager.svg';
import WorkerCardGraphic from 'src/app.modules/assets/register/completeWorker.svg';
import { RoleType } from 'src/app.modules/types/user';
import { getBrandByBranchString } from 'src/app.modules/util/getBrandByBranchString';

interface Props {
	userName: string;
	workPlace: string;
	role: RoleType | null;
}

function IdCard({ userName, workPlace, role }: Props) {
	return (
		<div>
			{role === 'MANAGER' && <ManagerCardGraphic />}
			{role === 'WORKER' && <WorkerCardGraphic />}
			<div className="w-[24rem] bg-w h-[12.5rem] rounded-b-[1rem] shadow-blue flex flex-col items-center justify-center">
				<span className="text-g7 text-subhead1">
					{role === 'MANAGER' && '점장'}
					{role === 'WORKER' && '알바생'}
				</span>
				<span className="mt-[0.4rem] mb-[0.8rem] text-subhead4 text-g10">{userName}</span>
				<span className="text-g8 text-subhead1">{getBrandByBranchString(workPlace ?? '')}</span>
			</div>
		</div>
	);
}

export default IdCard;
