import React from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';
import { pauseBtnAnim, runningBtnAnim } from '../utils/contolBtnAnim';

function SetWageScreen() {
	const {
		user: { wage },
		setWage,
	} = useRegisterUserStore();
	const wageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newWage = e.target.value;
		if (!Number(newWage) && newWage !== '') return;
		setWage(newWage === '' ? null : +newWage);
	};

	const resetWageHandler = () => {
		setWage(null);
	};

	return (
		<RegisterLayout curPage={5} canGoNext={Boolean(wage)}>
			<div className="space-y-[3.8rem]">
				<div className="space-y-[0.8rem] flex flex-col items-start">
					<h1 className="text-g10 text-title2">
						거의 다 왔어요!
						<br />
						일하시는 편의점의 시급을 알려주세요
					</h1>
					<span className="text-g8 text-subhead1">시급을 기준으로 급여를 계산해드려요!</span>
				</div>

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
