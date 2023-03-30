import React from 'react';
import { IUser } from 'src/app.modules/types/user';
import TextInput from '../app.base/Input/TextInput';

interface Props {
	phoneNumber?: IUser['phoneNumber'];
	onPhoneNumberChange: (phoneNumber: IUser['phoneNumber']) => void;
}
function PhoneForm({ phoneNumber, onPhoneNumberChange }: Props) {
	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		onPhoneNumberChange(e.target.value);
	};

	const resetPhoneNumberHandler = (): void => {
		onPhoneNumberChange('');
	};
	return (
		<TextInput
			value={phoneNumber ?? ''}
			onChange={phoneNumberHandler}
			resetHandler={resetPhoneNumberHandler}
			mode="default"
			placeholder="01012345678"
			type="tel"
		/>
	);
}

export default PhoneForm;
