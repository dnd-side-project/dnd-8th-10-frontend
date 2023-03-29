import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import InputInteractButton from 'src/app.components/Button/InputInteractButton';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBodyType } from 'src/app.modules/api/user';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { IUser } from '../types';

interface Props {
	user: IUser;
	putUser: MutateTpye<MutateUserBodyType>;
	isLoading: boolean;
}
function WageSettingScreen({ user, putUser, isLoading }: Props) {
	const [wage, setWage] = useState<string>(`${user?.wage ?? ''}`);
	const submitHandler = () => {
		if (isLoading) return;
		if (!wage) return;
		const body = {
			...user,
			wage: +wage,
		};

		putUser(body);
	};
	const wageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newWage = e.target.value;
		if (!Number(newWage) && newWage.trim() !== '') return;
		setWage(newWage);
	};
	const resetwageHandler = () => {
		setWage('');
	};

	return (
		<>
			<Header title="시급 수정" />
			<main className=" pt-[7.2rem] space-y-[0.8rem]">
				<h2 className="text-g6 text-subhead1">시급입력</h2>
				<TextInput
					value={wage ?? ''}
					onChange={wageHandler}
					resetHandler={resetwageHandler}
					mode="default"
					placeholder="9,620 원"
				/>
				<InputInteractButton disabled={!wage} onClick={submitHandler} />
			</main>
		</>
	);
}

export default WageSettingScreen;
