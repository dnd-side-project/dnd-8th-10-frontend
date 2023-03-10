import { useQuery } from '@tanstack/react-query';
import { boardView } from 'src/app.features/board/api';
import { getCookie } from 'src/app.modules/cookie';

function useBoardView(id: string | string[] | undefined) {
	const {
		data: boardViewData,
		refetch: boardViewReftch,
		isLoading: boardViewLoading,
	} = useQuery(['boardView', id], () => boardView(Number(id)), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: !!id,
	});
	return { boardViewData, boardViewReftch, boardViewLoading };
}

export default useBoardView;
