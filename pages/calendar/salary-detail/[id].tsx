import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ManageDetailScreen from 'src/app.features/calendar/screens/ManageDetailScreen';
import { getUser } from 'src/app.modules/api/user';

interface Props {
	children: React.ReactElement | null;
	data: string;
}

const Admin: React.FC<Props> = ({ children, data }) => {
	const router = useRouter();
	if (data !== 'MANAGER') {
		router.push(`/calendar/salary`);
	}
	return children;
};

const Detail: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, isLoading } = useQuery(['user', 'me'], getUser, {
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
	return (
		<>
			{!isLoading && (
				<Admin data={data?.data.data.role}>
					<ManageDetailScreen id={id} />
				</Admin>
			)}
		</>
	);
};
export default Detail;
