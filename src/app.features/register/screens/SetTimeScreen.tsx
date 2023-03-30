import React from 'react';
import { WeekWorkTimeForm } from 'src/app.components/UserForm/WeekWorkTimeForm';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

// TODO: 시간 유효성체크 (끝나는 시간이 시작하는 시간보다 빠른지)

function SetTimeScreen() {
	const {
		userForm: { workTimeObj },
		setTime,
	} = useRegisterUserStore();

	return (
		<RegisterLayout curPage={3} canGoNext={Boolean(workTimeObj)} guideMessage="일하는 요일별 근무시간을 알려주세요">
			{/* TODO: 다음으로 넘어가는 조건 다시 지정 (더 자세하게) */}
			<div className=" space-y-[3.2rem] mt-[2.4rem] ">
				<WeekWorkTimeForm workTimeObj={workTimeObj} onWorkTimeChange={setTime} />
			</div>
		</RegisterLayout>
	);
}

export default SetTimeScreen;
