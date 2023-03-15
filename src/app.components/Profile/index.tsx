import { start } from 'repl';
import { getFormmatedWorkTime } from 'src/app.features/mypage/utils/getFormattedWorkTime';
import Badge from '../app.base/Button/Badge';
import ProfileImage from '../ProfileImage';

interface Props {
	userProfileCode: number;
	userName: string;
	workTime: string;
	kakaoEmail: string;
}

function Profile({ userProfileCode, userName, workTime, kakaoEmail }: Props) {
	return (
		<div className="flex  items-start space-x-[1.2rem]">
			<ProfileImage round userProfileCode={userProfileCode} />
			<div className=" space-y-[1rem]">
				<div className="space-x-[0.8rem] flex items-start">
					<span className="text-g10 text-subhead4">{userName}님</span>
					<span className="text-g7 text-body2">{kakaoEmail}</span>
				</div>
				<div className="absolute z-[100] flex gap-[0.8rem]  overflow-x-scroll   touch-pan-x w-[calc(100vw-9.2rem)] max-w-[calc(50rem-9.2rem)] scrollbar-hidden ">
					{workTime.split(',').map((partTime, index) => (
						<Badge key={index} color="warmGray" size="small">
							<span className="text-body1 whitespace-nowrap">{getFormmatedWorkTime(partTime)}</span>
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}

export default Profile;
