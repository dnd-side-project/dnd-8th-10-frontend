import React from 'react';

interface Props {
	size?: 'lg' | 'md' | 'sm' | 'xs'; // lg->3.8rem, md->3.4rem, sm->2.8rem
	round?: boolean;
	userProfileCode: number; // 1~10 사이 숫자
	userName?: string;
}
function ProfileImage({ size = 'xs', userProfileCode, userName = '알수 없음', round = false }: Props) {
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
			<div className={round ? getRoundSize() : getSize()}>
				{userProfileCode && (
					<img
						alt={`${userName}의 프로필 이미지`}
						src={`/images/user/${round ? 'round' : 'small'}_profile${userProfileCode}.svg`}
					/>
				)}
			</div>
		</>
	);
}

export default ProfileImage;
