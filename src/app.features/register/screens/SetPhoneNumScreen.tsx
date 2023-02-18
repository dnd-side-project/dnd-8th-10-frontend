import React, { useEffect, useState } from 'react';
import TextInput from 'src/app.components/Input/TextInput';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import RegisterLayout from '../components/RegisterLayout';
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
	const submitHandler = () => {
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
					placeholder="010-1234-5678"
				/>
			</div>
		</RegisterLayout>
	);
}

export default SetPhoneNumScreen;
