import React, { useEffect, useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import useRegisterUserStore, { dayMap } from '../store';

interface Props {
	postUser: MutateTpye<MutateUserBody>;
	isLoading: boolean;
}

// TODO: 전화번호 유효성 검사
function SetPhoneNumScreen({ postUser, isLoading }: Props) {
	const {
		user: { phoneNumber, role, storeName, workTime },
		setPhoneNumber,
	} = useRegisterUserStore();
	const getWorkTimeString = () => {
		try {
			return Object.entries(workTime)
				.sort(([a], [b]) => (a < b ? -1 : 1))
				.map(([day, time]) => {
					const { startTime, endTime } = time;
					console.log(endTime.meridiem);
					// TODO: 코드 이뿌게고치기
					return `${dayMap.get(day)}(${startTime.hour.length === 1 && startTime.meridiem === 'am' ? '0' : ''}${
						+startTime.hour + (startTime.meridiem === 'am' ? 0 : 12)
					}:${startTime.minute.length === 1 ? '0' : ''}${startTime.minute}~${
						endTime.hour.length === 1 && endTime.meridiem === 'am' ? '0' : ''
					}${+endTime.hour + (endTime.meridiem === 'am' ? 0 : 12)}:${endTime.minute.length === 1 ? '0' : ''}${
						endTime.minute
					})`;
				})
				.toString();
		} catch (e) {
			console.log(e);
			return '';
		}
	};
	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('제출');
		if (isLoading) return;
		const workTimeString = getWorkTimeString();
		if (!role || !phoneNumber || !storeName || !workTimeString.trim()) {
			alert('필수 정보를 모두 입력해주세요.');
			return;
		}
		// TODO: 요일 입력 받기
		const body = {
			role,
			workPlace: storeName,
			workTime: workTimeString,
			phoneNumber,
		};
		console.log(body);
		postUser(body);
	};
	return (
		<div>
			<form onSubmit={submitHandler}>
				<input
					value={phoneNumber ?? ''}
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
				<span>근무시간 : {getWorkTimeString()}</span>
				{}
				<span>전화번호 : {phoneNumber}</span>
			</div>
		</div>
	);
}

export default SetPhoneNumScreen;
/*

	근무시간 : {workTime.startTime.hour}시 {startTime.minute}분 {startTime.meridiem}-{endTime.hour}시 {endTime.minute}분{' '}
					{endTime.meridiem}
*/
