import Badge from '../app.base/Button/Badge';
import ProfileImage from '../ProfileImage';

interface Props {
	userProfileCode: number;
	userName: string;
	workTime: string;
}
function Profile({ userProfileCode, userName, workTime }: Props) {
	return (
		<div className="flex  items-start space-x-[1.2rem]">
			<ProfileImage round userProfileCode={userProfileCode} />
			<div className=" space-y-[1rem]">
				<span className="text-g10 text-subhead4">{userName}님</span>
				<div className="flex flex-wrap gap-[0.8rem]">
					{workTime.split(',').map((work, index) => (
						<Badge key={index} color="warmGray" size="small">
							<span className="text-body1">{work}</span>
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}

export default Profile;
