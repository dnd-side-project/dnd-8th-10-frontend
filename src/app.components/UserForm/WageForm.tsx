import React from 'react';
import { IUser } from 'src/app.modules/types/user';
import TextInput from '../app.base/Input/TextInput';

interface Props {
	wage?: IUser['wage'];
	onWageChange: (wage: IUser['wage']) => void;
}

function WageForm({ wage, onWageChange }: Props) {
	const wageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newWage = e.target.value;
		if (!Number(newWage) && newWage !== '') return;
		onWageChange(newWage);
	};

	const resetWageHandler = (): void => {
		onWageChange('');
	};
	return (
		<TextInput
			value={wage ?? ''}
			onChange={wageHandler}
			resetHandler={resetWageHandler}
			mode="default"
			placeholder="9,620 원"
		/>
	);
}

export default WageForm;
