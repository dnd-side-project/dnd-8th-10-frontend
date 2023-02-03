import React, { useEffect, useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import useRegisterUserStore from '../store';

interface Props {
	postUser: MutateTpye<MutateUserBody>;
	isLoading: boolean;
}

// TODO: 전화번호 유효성 검사
function SetPhoneNumScreen({ postUser, isLoading }: Props) {
	const {
		user: { phoneNumber, role, storeName, startTime, endTime },
		setPhoneNumber,
	} = useRegisterUserStore();

	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('제출');
		if (isLoading) return;
		if (!role || !phoneNumber || !storeName || !startTime || !endTime) {
			alert('필수 정보를 모두 입력해주세요.');
			return;
		}
		// TODO: 요일 입력 받기
		const body = {
			role,
			workPlace: storeName,
			workTime: `월(17:00~21:00),화(17:00~21:00)`,
			phoneNumber,
		};
		postUser(body);
	};
	return (
		<div>
			<form onSubmit={submitHandler}>
				<input
					value={phoneNumber}
					onChange={phoneNumberHandler}
					placeholder="01012345678"
					type="text"
					className="w-[300px] h-[30px] mt-[20px] py-2 px-4  border border-black rounded-lg  "
				/>
				<button type="submit">제출</button>
			</form>
			<div className="flex flex-col mt-2">
				<h4>
					<strong>입력된 정보</strong>
				</h4>
				<span>유저 타입 : {role}</span>
				<span>편의점명 : {storeName}</span>
				<span>
					근무시간 : {startTime.hour}시 {startTime.minute}분 {startTime.meridiem}-{endTime.hour}시 {endTime.minute}분{' '}
					{endTime.meridiem}
				</span>
				<span>전화번호 : {phoneNumber}</span>
			</div>
		</div>
	);
}

export default SetPhoneNumScreen;
