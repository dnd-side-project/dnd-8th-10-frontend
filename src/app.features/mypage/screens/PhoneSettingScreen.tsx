import React, { useEffect, useState } from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import InputInteractButton from 'src/app.components/Button/InputInteractButton';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import { IUser } from '../types';

interface Props {
	user: IUser;
	putUser: MutateTpye<MutateUserBody>;
	isLoading: boolean;
}
function PhoneSettingScreen({ user, putUser, isLoading }: Props) {
	const [phoneNumber, setPhoneNumber] = useState<string | null>(user?.phoneNumber);
	const submitHandler = () => {
		if (isLoading) return;
		const body = {
			...user,
			phoneNumber: !phoneNumber?.trim() ? null : phoneNumber,
		};

		putUser(body);
	};
	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};
	const resetPhoneNumberHandler = () => {
		setPhoneNumber('');
	};

	return (
		<>
			<Header title="전화번호 수정" />
			<main className="h-[100vh] pt-[7.2rem] space-y-[0.8rem]">
				<h2 className="text-g6 text-subhead1">개인 연락처</h2>
				<TextInput
					value={phoneNumber ?? ''}
					onChange={phoneNumberHandler}
					resetHandler={resetPhoneNumberHandler}
					mode="default"
					placeholder="010-0000-0000"
					submitHandler={submitHandler}
				/>
				<InputInteractButton disabled={false} onClick={submitHandler} />
			</main>
		</>
	);
}

export default PhoneSettingScreen;
