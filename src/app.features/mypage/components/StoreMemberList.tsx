import Badge from 'src/app.components/app.base/Button/Badge';
import ProfileImage from 'src/app.components/ProfileImage';
import { IUser } from 'src/app.modules/types/user';
import CallingIcon from 'src/app.modules/assets/mypage/calling.svg';
import { getFormmatedWorkTime } from '../utils/getFormattedWorkTime';

interface Props {
	userRole: IUser['role'];
	memberList: IUser[];
}
function StoreMemberList({ userRole, memberList }: Props) {
	return (
		<div className="space-y-[0.8rem]">
			<span className=" text-g6 text-subhead1">{userRole === 'MANAGER' ? '점장' : '알바생'}</span>
			<ul className="space-y-[2.4rem] ">
				{memberList?.map((item, index) => (
					<li key={index} className="flex items-start justify-between">
						<div className="flex space-x-[0.8rem]">
							<ProfileImage userProfileCode={item.userProfileCode} size="lg" />
							<div className="flex flex-col space-y-[0.4rem]">
								<div className="space-x-[0.6rem]">
									<span className="text-subhead2">{item.userName}</span>
									<span className="text-body2 text-g6">{item.email}</span>
								</div>
								<ul className="gap-[0.8rem] flex flex-wrap">
									{item.workTime.split(',').map((partTime, idx) => (
										<li key={`time-${idx}`}>
											<Badge size="small" color="warmGray">
												<span className="text-body1">{getFormmatedWorkTime(partTime)}</span>
											</Badge>
										</li>
									))}
								</ul>
							</div>
						</div>
						<a
							href={`${item?.phoneNumber ? `tel:${item.phoneNumber}` : '#'}`}
							target="_parent"
							aria-disabled={!item.phoneNumber}
							className="  p-[0.8rem] bg-g4 aria-disabled:bg-g1 rounded-[0.8rem]"
						>
							<CallingIcon />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default StoreMemberList;
