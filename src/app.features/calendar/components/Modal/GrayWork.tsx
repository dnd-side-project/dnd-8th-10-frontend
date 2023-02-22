import React from 'react';
import ProfileImage from 'src/app.components/ProfileImage';

interface Props {
	month: number;
	day: string;
	userName: [{ name: string; workTime: string; userProfileCode: number }] | never[];
	workModify: () => void;
}
function GrayWork({ month, day, userName, workModify }: Props) {
	return (
		<div>
			<div className="flex justify-between">
				<div>
					<span className="text-subhead3 text-g9">
						{month + 1}월 {day}일
					</span>
				</div>
				<button
					className="bg-w px-[0.9rem] py-[0.4rem] border-solid border-[0.15rem] border-g4  rounded-[0.8rem]"
					onClick={() => workModify()}
				>
					<span className="text-[1.4rem] text-g9">출근수정</span>
				</button>
			</div>
			<div>
				{userName.map((item: { name: string; workTime: string; userProfileCode: number }, index) => (
					<div className="my-[2.4rem] flex items-center" key={index}>
						<ProfileImage size="lg" userProfileCode={item?.userProfileCode} />
						<span className="text-subhead2 text-g10 mx-[0.8rem]">{item.name}</span>
						<span className="text-body2 text-g8">{item?.workTime}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default GrayWork;
