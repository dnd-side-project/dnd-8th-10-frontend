import React from 'react';

interface Props {
	month: number;
	day: string;
}
function FutureWork({ month, day }: Props) {
	return (
		<div>
			<div className="flex justify-between">
				<div>
					<span className="text-subhead3 text-g9">
						{month + 1}월 {day}일
					</span>
				</div>
			</div>
			<div className="text-center mb-[1.2rem] mt-[2.4rem]">
				<span className="text-body3 text-g7">아직 기록이 없어요.</span>
			</div>
		</div>
	);
}

export default FutureWork;
