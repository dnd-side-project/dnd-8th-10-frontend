import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ManageDetailScreen from 'src/app.features/calendar/screens/ManageDetailScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

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
	const { data, isLoading } = useUser();
	return (
		<>
			{!isLoading && (
				<Admin data={data.role}>
					<div className="h-[100vh]">
						<ManageDetailScreen id={id} />
					</div>
				</Admin>
			)}
		</>
	);
};
export default Detail;
