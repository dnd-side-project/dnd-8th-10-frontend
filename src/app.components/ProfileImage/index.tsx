import React from 'react';

interface Props {
	size?: 'lg' | 'md' | 'sm'; // lg->3.8rem, md->3.4rem, sm->2.8rem
	userProfileCode: number; // 1~10 사이 숫자
	round?: boolean;
}
function ProfileImage({ size, userProfileCode, round = false }: Props) {
	const getSize = () => {
		if (size === 'lg') return 'w-[3.8rem] h-[3.8rem] min-w-[3.8rem] min-h-[3.8rem]';
		if (size === 'md') return 'w-[3.4rem] h-[3.4rem] min-w-[3.4rem] min-h-[3.4rem]';
		return 'w-[2.8rem] h-[2.8rem] min-w-[2.8rem] min-h-[2.8rem]';
	};
	console.log(userProfileCode);
	return (
		<>
			{round ? (
				<div>{userProfileCode && <img alt="profile" src={`/images/user/round_profile${userProfileCode}.svg`} />}</div>
			) : (
				<div className={getSize()}>
					{userProfileCode && <img alt="profile" src={`/images/user/small_profile${userProfileCode}.svg`} />}
				</div>
			)}
		</>
	);
}

export default ProfileImage;
