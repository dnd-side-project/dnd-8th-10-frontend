import { useRouter } from 'next/router';
import React from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

// TODO: 전화번호 유효성 검사
// TODO: 전화번호 없이 등록 로직
function SetPhoneNumScreen() {
	const {
		userForm: { phoneNumber },
		setPhoneNumber,
	} = useRegisterUserStore();
	const router = useRouter();
	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPhoneNumber(e.target.value);
	};

	const resetPhoneNumberHandler = (): void => {
		setPhoneNumber('');
	};
	// TODO: 전화번호 포맷 유효하면 넘어가게 수정하기
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
				<TextInput
					value={phoneNumber ?? ''}
					onChange={phoneNumberHandler}
					resetHandler={resetPhoneNumberHandler}
					mode="default"
					placeholder="01012345678"
					type="tel"
				/>
			</div>
		</RegisterLayout>
	);
}

export default SetPhoneNumScreen;
