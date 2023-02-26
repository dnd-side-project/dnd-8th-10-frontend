import React, { useEffect, useState } from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import { getWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

interface Props {
	postUserMutate: MutateTpye<MutateUserBody>;
	isLoading: boolean;
}

// TODO: 전화번호 유효성 검사
function SetPhoneNumScreen({ postUserMutate, isLoading }: Props) {
	const {
		user: { phoneNumber, role, workPlace, workTime, workLocation },
		setPhoneNumber,
	} = useRegisterUserStore();

	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};
	const submitHandler = () => {
		console.log('제출');
		if (isLoading) return;
		const workTimeString = getWorkTimeString(workTime);
		if (!role || !phoneNumber || !workPlace || !workTimeString.trim() || !workLocation) {
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
			wage: 9620, // TODO:급여필드 만들기
		};
		console.log(body);
		postUserMutate(body);
	};
	const resetPhoneNumberHandler = () => {
		setPhoneNumber('');
	};
	// TODO: 전화번호 포맷 유효하면 넘어가게 수정하기
	return (
		<RegisterLayout curPage={4} canGoNext={Boolean(phoneNumber?.trim())} registerUser={submitHandler}>
			<div className="space-y-[1.6rem]">
				<h1 className="text-g10 text-title2">전화번호를 알려주세요</h1>
				<TextInput
					value={phoneNumber ?? ''}
					onChange={phoneNumberHandler}
					resetHandler={resetPhoneNumberHandler}
					mode="default"
					placeholder="010-0000-0000"
				/>
			</div>
		</RegisterLayout>
	);
}

export default SetPhoneNumScreen;
