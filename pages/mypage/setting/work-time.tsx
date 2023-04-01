import React from 'react';
import WorkTimeSettingScreen from 'src/app.features/mypage/screens/WorkTimeSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';
// TODO: 오전 12시가 점심 12시로 들어가고 오후 12시가 24시로 들어가네요
function workTime() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	const { localUser } = useLocalUserStore();
	return <WorkTimeSettingScreen user={data ?? localUser} putUser={putUserMutate} isLoading={isLoading} />;
}

export default workTime;
