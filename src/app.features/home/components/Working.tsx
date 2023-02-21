import React from 'react';
import WorkIcon from '../../../../public/images/home/work.svg';
function Working() {
	return (
		<div className="h-[11.3rem] my-[1.6rem] px-[2rem] py[1.6rem] shadow-blue flex justify-between items-center rounded-[0.8rem]">
			<div className="h-[7.4rem] flex flex-col justify-between">
				<div>
					<span className="text-title2 text-g9">출근하기</span>
				</div>
				<div>
					<span className="text-subhead1 text-g6">1월 18일 근무 시작하기</span>
				</div>
			</div>
			<WorkIcon />
		</div>
	);
}

export default Working;
