import React from 'react';

interface Props {
	size?: 'lg' | 'md' | 'sm' | 'xs'; // lg->3.8rem, md->3.4rem, sm->2.8rem
	userProfileCode: number; // 1~10 사이 숫자
	round?: boolean;
}
function ProfileImage({ size, userProfileCode, round = false }: Props) {
	const getSize = () => {
		if (size === 'lg') return 'w-[3.8rem] h-[3.8rem] min-w-[3.8rem] min-h-[3.8rem]';
		if (size === 'md') return 'w-[3.4rem] h-[3.4rem] min-w-[3.4rem] min-h-[3.4rem]';
		if (size === 'sm') return 'w-[2.8rem] h-[2.8rem] min-w-[2.8rem] min-h-[2.8rem]';
		return 'w-[2.4rem] h-[2.4rem] min-w-[2.4rem] min-h-[2.4rem]'; // xs
	};
	const getRoundSize = () => {
		return 'w-[6rem] h-[6rem] min-w-[6rem] min-h-[6rem]';
	};
	return (
		<>
			{round ? (
				<div className={getRoundSize()}>
					{userProfileCode && <img alt="profile" src={`/images/user/round_profile${userProfileCode}.svg`} />}
				</div>
			) : (
				<div className={getSize()}>
					{userProfileCode && <img alt="profile" src={`/images/user/small_profile${userProfileCode}.svg`} />}
				</div>
			)}
		</>
	);
}

export default ProfileImage;
