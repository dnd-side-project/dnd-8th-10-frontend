import { useMutation } from '@tanstack/react-query';
import { putUser } from 'src/app.modules/api/user';

function usePutUser() {
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
	return { putUserMutate, isLoading };
}

export default usePutUser;
