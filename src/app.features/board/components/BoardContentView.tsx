import React from 'react';
import ViewImgIcon from '../assets/viewImg.svg';
import CheckIcon from '../../../app.modules/assets/board/check.svg';

interface Props {
	id: string | string[] | undefined;
}

function BoardContentView({ id }: Props) {
	return (
		<div>
			<div className="mb-[1.6rem]">
				<div className="flex items-center">
					<span className="text-subhead2 text-g9">{`${id}월 발렌타인데이 이벤트 필독!`}</span>
				</div>
				<div className="mt-[0.2rem]">
					<span className="text-secondary text-body1 mr-[0.7rem]">공지</span>
					<span className="text-body1 text-g7">김냠냠 점장 1분전</span>
				</div>
			</div>
			<div className="flex justify-center mb-[0.8rem]">
				<ViewImgIcon />
			</div>
			<div className="mb-[2.4rem]">
				<span className="text-body2 text-g9">
					발렌타인데이 이벤트 기간이 내일부터 시작됩니다~~ 기간이랑 이벤트 상품들 바코드 잘 붙어있는지 한번씩 확인
					부탁드려요!!
				</span>
			</div>
			<div className="flex text-body-long2 text-g6">
				<div className="mr-[0.8rem] flex items-center">
					<CheckIcon />
					<span className="ml-[0.4rem]">11</span>
				</div>
				<div>조회 30</div>
			</div>
		</div>
	);
}

export default BoardContentView;
