import { useMutation } from '@tanstack/react-query';
import React from 'react';
import WorkTimeSettingScreen from 'src/app.features/mypage/screens/WorkTimeSettingScreen';
import { putUser } from 'src/app.modules/api/user';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';

function workTime() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	return <WorkTimeSettingScreen user={data} putUser={putUserMutate} isLoading={isLoading} />;
}

export default workTime;
