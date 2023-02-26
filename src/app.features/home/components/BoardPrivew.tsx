import React from 'react';
import Badge from 'src/app.components/app.base/Button/Badge';

function BoardPrivew() {
	return (
		<div className="flex items-center justify-between rounded-[1.2rem] px-[1.6rem] py-[1rem] shadow-blue">
			<div className="flex items-center">
				<Badge color="secondary" size="large">
					공지사항
				</Badge>
				<div className="ml-[1rem] ">
					<span className="text-subhead2 text-g9">3월 화이트데이 이벤트 필독!</span>
				</div>
			</div>
			<div>
				<span className="text-subhead1 text-g6">전체보기</span>
			</div>
		</div>
	);
}

export default BoardPrivew;
