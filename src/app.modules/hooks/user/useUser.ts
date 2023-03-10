import { useQuery } from '@tanstack/react-query';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { getUser } from 'src/app.modules/api/user';
import { getCookie } from 'src/app.modules/cookie';

function useUser() {
	const { updateUser } = useLocalUserStore();
	const { data, refetch, isLoading } = useQuery(['user', 'me'], getUser, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			if (JSON.stringify(getCookie('USER')) !== JSON.stringify(res)) {
				const expires = new Date();
				expires.setDate(expires.getDate() + 7); // 일주일 동안 저장
				document.cookie = `USER=${encodeURIComponent(JSON.stringify(res))};expires=${expires};path=/`;
				updateUser(res);
			}
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: Boolean(getCookie('wiseat')) || Boolean(getCookie('wisert')), // 토큰이 없으면 유저상태를 가져 올 수 없음. 비로그인 상태로 전환됨
	});
	return { data, refetch, isLoading };
}

export default useUser;
