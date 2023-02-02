import React, { useEffect, useState } from 'react';
import useRegisterUserStore from '../store';
// TODO: 전화번호 유효성 검사
function SetPhoneNumScreen() {
	const {
		user: { phoneNumber, type, storeName, startTime, endTime },
		setPhoneNumber,
	} = useRegisterUserStore();

	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};

	return (
		<div>
			<form>
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
				<span>유저 타입 : {type}</span>
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
