import { useRouter } from 'next/router';
import React from 'react';
import ProfileImage from 'src/app.components/ProfileImage';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { formatTimeView } from 'src/app.modules/util/calendar';

interface Props {
	month: number;
	day: string;
	userName: [{ name: string; workTime: string; userProfileCode: number; timeCardId: number }] | never[];
	currentUser: string;
}

function WorkList({ month, day, userName, currentUser }: Props) {
	const router = useRouter();

	return (
		<div>
			<div className="flex justify-between">
				<div>
					<span className="text-subhead3 text-g9">
						{month + 1}월 {day}일의 근무자
					</span>
				</div>
				<button
					onClick={() => {
						router.push(`${SERVICE_URL.calendarRecord}/${'commute'}?title=${'add'}`);
					}}
					className="text-primary text-subhead3"
				>
					근무기록 추가
				</button>
			</div>
			<div>
				{userName.length > 0 ? (
					userName.map((item, index) => (
						<div className="my-[2.4rem] flex items-center justify-between" key={index}>
							<div className="flex items-center">
								<ProfileImage size="lg" userProfileCode={item.userProfileCode} />
								<span className="text-subhead2 text-g10 mx-[0.8rem]">{item.name}</span>
								<span className="text-body2 text-g8">
									{`${formatTimeView(item.workTime)[0]} - ${formatTimeView(item.workTime)[1]}`}
								</span>
							</div>
							<div>
								{item.name === currentUser && (
									<button
										className="bg-w px-[0.9rem] py-[0.4rem] border-solid border-[0.15rem] border-g4  rounded-[0.8rem]"
										onClick={() => {
											router.push(`${SERVICE_URL.calendarRecord}/${item.timeCardId}?title=${'modify'}`);
										}}
									>
										<span className="text-[1.4rem] text-g9">출근수정</span>
									</button>
								)}
							</div>
						</div>
					))
				) : (
					<div className="text-center mb-[1.2rem] mt-[2.4rem]">
						<span className="text-body3 text-g7">아직 기록이 없어요.</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default WorkList;
