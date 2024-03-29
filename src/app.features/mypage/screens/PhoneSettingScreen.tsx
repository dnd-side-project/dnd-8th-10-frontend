import React, { useEffect, useState } from 'react';
import InputInteractButton from 'src/app.components/Button/InputInteractButton';
import Header from 'src/app.components/Header';
import PhoneForm from 'src/app.components/UserForm/PhoneForm';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBodyType } from 'src/app.modules/api/user';
import { IUser } from 'src/app.modules/types/user';

interface Props {
	user: IUser;
	putUser: MutateTpye<MutateUserBodyType>;
	isLoading: boolean;
}
function PhoneSettingScreen({ user, putUser, isLoading }: Props) {
	const [phoneNumber, setPhoneNumber] = useState<string | null>(user?.phoneNumber);
	const submitHandler = (): void => {
		if (isLoading) return;
		const body = {
			...user,
			phoneNumber: !phoneNumber?.trim() ? null : phoneNumber,
		};

		putUser(body);
	};

	return (
		<>
			<Header title="전화번호 수정" />
			<main className="pt-[7.2rem] space-y-[0.8rem]">
				<h2 className="text-g6 text-subhead1">개인 연락처</h2>
				<PhoneForm phoneNumber={phoneNumber} onPhoneNumberChange={setPhoneNumber} />
				<InputInteractButton disabled={false} onClick={submitHandler} />
			</main>
		</>
	);
}

export default PhoneSettingScreen;
