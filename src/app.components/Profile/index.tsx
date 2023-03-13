import { start } from 'repl';
import Badge from '../app.base/Button/Badge';
import ProfileImage from '../ProfileImage';

interface Props {
	userProfileCode: number;
	userName: string;
	workTime: string;
	kakaoEmail: string;
}
const getFormmatedWorkTime = (partTime: string) => {
	const day = partTime[0];
	const [startTime, endTime] = partTime.slice(2, -1).split('~');
	const [startTimeHour, startTimeMinute] = startTime.split(':');
	const [endTimeHour, endTimeMinute] = endTime.split(':');
	const getMeridem = (hour: string) => (+hour < 12 || +hour >= 24 ? '오전' : '오후');
	return `${day}(${getMeridem(startTimeHour)} ${+startTimeHour % 12}:${startTimeMinute} - ${getMeridem(endTimeHour)}${
		+endTimeHour % 12
	}:${endTimeMinute})`;
};
function Profile({ userProfileCode, userName, workTime, kakaoEmail }: Props) {
	return (
		<div className="flex  items-start space-x-[1.2rem]">
			<ProfileImage round userProfileCode={userProfileCode} />
			<div className=" space-y-[1rem]">
				<div className="space-x-[0.8rem] flex items-start">
					<span className="text-g10 text-subhead4">{userName}님</span>
					<span className="text-g7 text-body2">{kakaoEmail}</span>
				</div>
				<div className="absolute flex gap-[0.8rem]  overflow-x-scroll   touch-pan-x w-[calc(100vw-9.2rem)] max-w-[calc(50rem-9.2rem)] scrollbar-hidden ">
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
