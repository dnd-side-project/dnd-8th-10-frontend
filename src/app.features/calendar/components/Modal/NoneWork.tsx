import React from 'react';

interface Props {
	month: number;
	day: string;
	clickDayData: Date;
	toDayData: Date;
	workModify: () => void;
}
function NoneWork({ month, day, clickDayData, toDayData, workModify }: Props) {
	return (
		<div>
			<div className="flex justify-between">
				<div>
					<span className="text-subhead3 text-g9">
						{month + 1}월 {day}일
					</span>
				</div>
				<div>
					{clickDayData < toDayData && (
						<button
							className="bg-w px-[0.9rem] py-[0.4rem] border-solid border-[0.15rem] border-g4  rounded-[0.8rem]"
							onClick={() => workModify()}
						>
							<span className="text-[1.4rem] text-g9">출근수정</span>
						</button>
					)}
				</div>
			</div>
			<div className="text-center m-[2.4rem]">
				<span className="text-body3 text-g7">아직 기록이 없어요.</span>
			</div>
		</div>
	);
}

export default NoneWork;
