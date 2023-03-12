import type { NextPage } from 'next';
import React from 'react';
import ManagerScreen from 'src/app.features/calendar/screens/ManagerScreen';
import WorkerScreen from 'src/app.features/calendar/screens/WorkerScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

interface Props {
	children: React.ReactElement;
	data: string;
	type?: string;
}

export const Admin: React.FC<Props> = ({ children, data, type = '' }) => {
	if (data !== 'MANAGER') {
		return (
			<div className="min-h-[100vh]">
				<WorkerScreen />
			</div>
		);
	}
	return children;
};

const SalaryPage: NextPage = () => {
	const { data, isLoading } = useUser();

	return (
		<div className="min-h-[100vh] mx-auto relative w-full">
			{!isLoading && (
				<Admin data={data.role} type="detail">
					<ManagerScreen />
				</Admin>
			)}
		</div>
	);
};

export default SalaryPage;
