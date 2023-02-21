import { useMutation } from '@tanstack/react-query';
import React from 'react';
import WorkTimeSettingScreen from 'src/app.features/mypage/screens/WorkTimeSettingScreen';
import { putUser } from 'src/app.modules/api/user';
import useUser from 'src/app.modules/hooks/user/useUser';

function workTime() {
	const { data } = useUser();
	const { mutate: putUserMutate, isLoading } = useMutation(putUser, {
		onSuccess: (res) => {
			console.log(res);
			alert('회원정보 수정 완료');
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	return <WorkTimeSettingScreen user={data} putUser={putUserMutate} isLoading={isLoading} />;
}

export default workTime;
