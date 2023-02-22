import { useQuery } from '@tanstack/react-query';
import { getUser } from 'src/app.modules/api/user';
import { getCookie } from 'src/app.modules/cookie';

function useUser() {
	const { data, refetch, isLoading } = useQuery(['user', 'me'], getUser, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log('유저 정보', res);
		},
		onError: (error) => {
			console.log(error);
		},
		suspense: true,
		enabled: Boolean(getCookie('ACCESS_TOKEN')) || Boolean(getCookie('REFRESH_TOKEN')), // 토큰이 없으면 유저상태를 가져 올 수 없음. 비로그인 상태로 전환됨
	});
	return { data, refetch, isLoading };
}

export default useUser;
