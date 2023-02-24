import { useMutation } from '@tanstack/react-query';
import React from 'react';
import WorkTimeSettingScreen from 'src/app.features/mypage/screens/WorkTimeSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { putUser } from 'src/app.modules/api/user';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';

function workTime() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	const { localUser } = useLocalUserStore();
	return <WorkTimeSettingScreen user={data ?? localUser} putUser={putUserMutate} isLoading={isLoading} />;
}

export default workTime;
