import React from 'react';
import { useRouter } from 'next/router';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import CheckSmallIcon from '../../../app.modules/assets/board/checkSmall.svg';

function BoardPreview() {
	const router = useRouter();
	return (
		<div>
			{[...new Array(3)].map((_, index) => (
				<div
					role="presentation"
					key={index}
					className="first:pt-[0rem] py-[1.2rem] border-solid border-b-[0.05rem] border-b-g3"
					onClick={() => router.push(`${SERVICE_URL.boardView}/${index}`)}
				>
					<div>
						<span className="text-subhead2 text-g9">3월 화이트데이 전달사항 있습니다~!</span>
					</div>
					<div className="flex justify-between">
						<div className="text-body1">
							<span className="text-secondary mr-[0.4rem]">전달</span>
							<span className="text-g7">김냠냠 점장 1분전</span>
						</div>
						<div className="flex items-center">
							<CheckSmallIcon /> <span className="text-body1 text-g6 ml-[0.4rem]">11</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default BoardPreview;
/* <div onClick={() => router.push(`${SERVICE_URL.boardView}/${1}`)}>화장실 문고리 부서졌어요....</div> */
