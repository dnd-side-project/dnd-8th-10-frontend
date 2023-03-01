import { useQuery } from '@tanstack/react-query';
import { boardView } from 'src/app.features/board/api';

function useBoardView(id: string | string[] | undefined) {
	const {
		data: boardViewData,
		refetch: boardViewReftch,
		isLoading: boardViewLoading,
	} = useQuery(['boardLoad'], () => boardView(Number(id)), {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	return { boardViewData, boardViewReftch, boardViewLoading };
}

export default useBoardView;