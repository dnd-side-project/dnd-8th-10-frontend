import ProfileImage from '../ProfileImage';

interface Props {
	userProfileCode: number;
	userName: string;
	role: string;
	workTime: string;
	totalSalary: number;
}
function Profile({ userData }: { userData: Props }) {
	return (
		<div className="flex items-center">
			<ProfileImage round userProfileCode={userData.userProfileCode} />
			<div className="ml-[1.6rem]">
				<span className="text-w text-subhead4">{userData.userName}</span>
				<span className="text-g3 text-subhead3 ml-[0.8rem]">{userData.role === 'MANAGER' ? '점장' : '알바생'}</span>
				<div className="flex">
					{userData.workTime.includes(',') ? (
						userData.workTime.split(',').map((work, index) => (
							<div key={index} className="bg-g9 w-fit rounded-[0.4rem] py-[0.2rem] px-[0.8rem] mt-[0.8rem] mr-[0.8rem]">
								<span className="text-w text-body1">{work}</span>
							</div>
						))
					) : (
						<div className="bg-g9 w-fit rounded-[0.4rem] py-[0.2rem] px-[0.8rem] mt-[0.8rem]">
							<span className="text-w text-body1">{userData.workTime.split(',')[0]}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
