import { useMutation } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { delWorkModify, postWork, putWorkModify } from 'src/app.features/calendar/api';
import WorkRecordScreen from 'src/app.features/calendar/screens/WorkRecordScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

const WorkRecord: NextPage = () => {
	const router = useRouter();
	const { title, id } = router.query;

	const { data: UserData } = useUser();
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

	// 삭제하기
	const { mutate: DeleteMutate } = useMutation(delWorkModify, {
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => console.log(error),
	});

	return (
		<WorkRecordScreen
			WorkMutate={WorkMutate}
			ModifyMutate={ModifyMutate}
			DeleteMutate={DeleteMutate}
			UserData={UserData}
			title={title}
			id={id}
		/>
	);
};

export default WorkRecord;
