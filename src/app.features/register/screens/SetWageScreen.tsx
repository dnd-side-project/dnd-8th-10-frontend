import React from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

function SetWageScreen() {
	const {
		userForm: { wage },
		setWage,
	} = useRegisterUserStore();
	const wageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newWage = e.target.value;
		if (!Number(newWage) && newWage !== '') return;
		setWage(newWage);
	};

	const resetWageHandler = (): void => {
		setWage('');
	};

	return (
		<RegisterLayout
			curPage={5}
			canGoNext={Boolean(wage)}
			guideMessage={`거의 다 왔어요!\n일하시는 편의점의 시급을 알려주세요`}
		>
			<div className="space-y-[2.4rem] pt-[1rem]">
				<span className="text-g8 text-subhead1 flex flex-col items-start">시급을 기준으로 급여를 계산해드려요!</span>

				<TextInput
					value={`${wage ?? ''}`}
					onChange={wageHandler}
					resetHandler={resetWageHandler}
					mode="default"
					placeholder="현재 최저임금은 9,620원입니다."
					type="number"
				/>
			</div>
		</RegisterLayout>
	);
}

export default SetWageScreen;
