import React from 'react';
import WageForm from 'src/app.components/UserForm/WageForm';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

function SetWageScreen() {
	const {
		userForm: { wage },
		setWage,
	} = useRegisterUserStore();

	return (
		<RegisterLayout
			curPage={5}
			canGoNext={Boolean(wage)}
			guideMessage={`거의 다 왔어요!\n일하시는 편의점의 시급을 알려주세요`}
		>
			<div className="space-y-[2.4rem] pt-[1rem]">
				<span className="text-g8 text-subhead1 flex flex-col items-start">시급을 기준으로 급여를 계산해드려요!</span>

				<WageForm wage={`${wage ?? ''}`} onWageChange={setWage} />
			</div>
		</RegisterLayout>
	);
}

export default SetWageScreen;
