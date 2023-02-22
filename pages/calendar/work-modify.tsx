import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { postWork, putWorkModify } from 'src/app.features/calendar/api';
import WorkModifyScreen from 'src/app.features/calendar/screens/WorkModifyScreen';

const WorkModify: NextPage = () => {
	const router = useRouter();
	// 출근하기
	const { mutate: WorkMutate } = useMutation(postWork, {
		onSuccess: (res) => {
			// console.log(res);
			router.back();
		},
		onError: (error) => alert('오류 발생.'),
	});

	// 수정하기
	const { mutate: ModifyMutate } = useMutation(putWorkModify, {
		onSuccess: (res) => {
			// console.log(res);
			router.back();
		},
		onError: (error) => console.log(error),
	});
	return <WorkModifyScreen WorkMutate={WorkMutate} ModifyMutate={ModifyMutate} />;
};

export default WorkModify;
