import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import React from 'react';
import ManagerScreen from 'src/app.features/calendar/screens/ManagerScreen';
import WorkerScreen from 'src/app.features/calendar/screens/WorkerScreen';
import { getUser } from 'src/app.modules/api/user';

interface Props {
	children: React.ReactElement;
	data: string;
	type?: string;
}

export const Admin: React.FC<Props> = ({ children, data, type = '' }) => {
	if (data !== 'MANAGER') {
		return <WorkerScreen />;
	}
	return children;
};

const SalaryPage: NextPage = () => {
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
				<Admin data={data?.data.data.role} type="detail">
					<ManagerScreen />
				</Admin>
			)}
		</>
	);
};

export default SalaryPage;