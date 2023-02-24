import { useMutation } from '@tanstack/react-query';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { putUser } from 'src/app.modules/api/user';
import { setCookie } from 'src/app.modules/cookie';

function usePutUser() {
	const { updateUser } = useLocalUserStore();
	const { mutate: putUserMutate, isLoading } = useMutation(putUser, {
		onSuccess: (res) => {
			console.log(res.data.data);
			const {
				data: { data: updatedUser },
			} = res;
			setCookie('USER', JSON.stringify(updatedUser));
			updateUser(updatedUser);
			console.log(updatedUser, 'updated');
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
