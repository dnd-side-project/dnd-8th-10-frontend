import React, { useState } from 'react';
import InputInteractButton from 'src/app.components/Button/InputInteractButton';
import Header from 'src/app.components/Header';
import WageForm from 'src/app.components/UserForm/WageForm';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBodyType } from 'src/app.modules/api/user';
import { IUser } from 'src/app.modules/types/user';

interface Props {
	user: IUser;
	putUser: MutateTpye<MutateUserBodyType>;
	isLoading: boolean;
}
function WageSettingScreen({ user, putUser, isLoading }: Props) {
	const [wage, setWage] = useState<string>(`${user?.wage ?? ''}`);
	const submitHandler = (): void => {
		if (isLoading) return;
		if (!wage) return;
		const body = {
			...user,
			wage,
		};

		putUser(body);
	};

	return (
		<>
			<Header title="시급 수정" />
			<main className=" pt-[7.2rem] space-y-[0.8rem]">
				<h2 className="text-g6 text-subhead1">시급입력</h2>
				<WageForm wage={`${wage ?? ''}`} onWageChange={setWage} />
				<InputInteractButton disabled={!wage} onClick={submitHandler} />
			</main>
		</>
	);
}

export default WageSettingScreen;
