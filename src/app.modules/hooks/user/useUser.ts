import { useQuery } from '@tanstack/react-query';
import { getUser } from 'src/app.modules/api/user';

function useUser() {
	const { data, refetch, isLoading } = useQuery(['user', 'me'], getUser, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
	return { data, refetch, isLoading };
}

export default useUser;
