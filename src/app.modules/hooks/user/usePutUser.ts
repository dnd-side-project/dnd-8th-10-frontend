import { useMutation } from '@tanstack/react-query';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { putUser } from 'src/app.modules/api/user';
import { getCookie, setCookie } from 'src/app.modules/cookie';

function usePutUser() {
	const { updateUser } = useLocalUserStore();
	const { mutate: putUserMutate, isLoading } = useMutation(putUser, {
		onSuccess: (res) => {
			console.log(res.data.data);
			const {
				data: { data: updatedUser },
			} = res;
			const expires = new Date();
			expires.setDate(expires.getDate() + 7); // 일주일 동안 저장
			document.cookie = `USER=${encodeURIComponent(JSON.stringify(updatedUser))};expires=${expires}`;
			updateUser(updatedUser);
			alert('회원정보 수정 완료');
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	return { putUserMutate, isLoading };
}

export default usePutUser;
