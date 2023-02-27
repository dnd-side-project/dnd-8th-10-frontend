import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';
import { pauseBtnAnim, runningBtnAnim } from '../utils/contolBtnAnim';

// TODO: 전화번호 유효성 검사
// TODO: 전화번호 없이 등록 로직
function SetPhoneNumScreen() {
	const {
		user: { phoneNumber },
		setPhoneNumber,
	} = useRegisterUserStore();
	const router = useRouter();
	const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};

	const resetPhoneNumberHandler = () => {
		setPhoneNumber('');
	};
	// TODO: 전화번호 포맷 유효하면 넘어가게 수정하기
	return (
		<RegisterLayout curPage={4} canGoNext>
			<div className="space-y-[2.4rem]">
				<div className="space-y-[0.8rem] flex flex-col items-start">
					<div className="flex justify-between items-center w-full">
						<h1 className="text-g10 text-title2">전화번호를 알려주세요</h1>
						{!router?.query?.title && (
							<button
								type="button"
								onClick={() => router.push(`${SERVICE_URL.register}?page=5`)}
								className="text-primary text-subhead2 "
							>
								건너뛰기
							</button>
						)}
					</div>
					<span className="text-g8 text-subhead1">입력시 근무자들과 연락처를 공유할 수 있어요.</span>
				</div>
				<TextInput
					value={phoneNumber ?? ''}
					onChange={phoneNumberHandler}
					resetHandler={resetPhoneNumberHandler}
					mode="default"
					placeholder="010-0000-0000"
					onFocus={runningBtnAnim}
					onBlur={pauseBtnAnim}
				/>
			</div>
		</RegisterLayout>
	);
}

export default SetPhoneNumScreen;
