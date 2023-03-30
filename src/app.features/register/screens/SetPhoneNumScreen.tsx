import { useRouter } from 'next/router';
import React from 'react';
import PhoneForm from 'src/app.components/UserForm/PhoneForm';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

function SetPhoneNumScreen() {
	const {
		userForm: { phoneNumber },
		setPhoneNumber,
	} = useRegisterUserStore();
	const router = useRouter();

	return (
		<RegisterLayout curPage={4} canGoNext guideMessage="전화번호를 알려주세요">
			<div className="space-y-[2.4rem] pt-[1rem]">
				<div className=" flex flex-col items-start">
					{!router?.query?.title && (
						<button
							type="button"
							onClick={() => router.push(`${SERVICE_URL.register}?page=5`)}
							className="text-primary text-subhead2 absolute top-[9rem] right-0"
						>
							건너뛰기
						</button>
					)}

					<span className="text-g8 text-subhead1">입력시 근무자들과 연락처를 공유할 수 있어요.</span>
				</div>
				<PhoneForm phoneNumber={phoneNumber} onPhoneNumberChange={setPhoneNumber} />
			</div>
		</RegisterLayout>
	);
}

export default SetPhoneNumScreen;
