import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ManageDetailScreen from 'src/app.features/calendar/screens/ManageDetailScreen';

interface Props {
	children: React.ReactElement | null;
}

const isAdmin = (): boolean => {
	// 점장 유효성 검사
	return true;
};

const Admin: React.FC<Props> = ({ children }) => {
	const router = useRouter();
	if (!isAdmin()) {
		router.push(`/calendar/salary`);
	}
	return children;
};

const Detail: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<Admin>
			<ManageDetailScreen id={id} />
		</Admin>
	);
};
export default Detail;
