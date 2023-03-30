import React from 'react';
import { COOKIE_KEY } from 'src/app.modules/constants/Cookie';

function NewbieGuide() {
	return (
		<div className="w-full bg-g1 rounded-[0.8rem]">
			<div className="mx-auto space-y-[0.8rem]  mt-[2.4rem] p-[1.6rem] text-subhead2  text-g8">
				<p className="text-start whitespace-pre-wrap">
					{`내 할일 점검에서 잊지않게 업무를 체크해보세요!\n나의 업무에 맞게 항목을 수정, 삭제할 수 있습니다.`}
				</p>
				<button
					onClick={() => {
						document.cookie = `${COOKIE_KEY.IS_NEWBIE}=false; max-age=-1 ;path=/;`;
					}}
					className="text-primary w-full text-end"
				>
					닫기
				</button>
			</div>
		</div>
	);
}

export default NewbieGuide;
