import ProfileImage from '../ProfileImage';

interface Props {
	userProfileCode: number;
	userName: string;
	role?: string;
	workTime: string;
	mypage?: boolean;
}
function Profile({ mypage = true, userProfileCode, userName, role, workTime }: Props) {
	return (
		<div className="flex items-center">
			<ProfileImage round userProfileCode={userProfileCode} />
			<div className="ml-[1.6rem]">
				<span className={`${mypage ? 'text-g10' : 'text-w'} text-subhead4`}>
					{userName}
					{mypage && '님'}
				</span>
				{!mypage && <span className="text-g3 text-subhead3 ml-[0.8rem]">{role === 'MANAGER' ? '점장' : '알바생'}</span>}
				<div className="flex">
					{workTime.includes(',') ? (
						workTime.split(',').map((work, index) => (
							<div key={index} className="bg-g9 w-fit rounded-[0.4rem] py-[0.2rem] px-[0.8rem] mt-[0.8rem] mr-[0.8rem]">
								<span className="text-w text-body1">{work}</span>
							</div>
						))
					) : (
						<div className="bg-g9 w-fit rounded-[0.4rem] py-[0.2rem] px-[0.8rem] mt-[0.8rem]">
							<span className="text-w text-body1">{workTime}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
