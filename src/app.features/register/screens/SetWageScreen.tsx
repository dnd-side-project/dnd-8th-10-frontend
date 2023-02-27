import React from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import { getUserWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

interface Props {
	postUserMutate: MutateTpye<MutateUserBody>;
	isLoading: boolean;
}
function SetWageScreen({ postUserMutate, isLoading }: Props) {
	const {
		user: { phoneNumber, role, workPlace, workTime, workLocation, wage },
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
	const submitHandler = () => {
		console.log('제출');
		if (isLoading) return;
		const workTimeString = getUserWorkTimeString(workTime);
		if (!role || !phoneNumber || !workPlace || !workTimeString.trim() || !workLocation || !wage) {
			alert('필수 정보를 모두 입력해주세요.');
			return;
		}
		// TODO: 요일 입력 받기
		const body = {
			role,
			workPlace,
			workTime: workTimeString,
			workLocation,
			phoneNumber,
			wage, // TODO:급여필드 만들기
		};
		console.log(body);
		// postUserMutate(body);
	};
	return (
		<RegisterLayout curPage={5} canGoNext={Boolean(wage)} registerUser={submitHandler}>
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
				/>
			</div>
		</RegisterLayout>
	);
}

export default SetWageScreen;
