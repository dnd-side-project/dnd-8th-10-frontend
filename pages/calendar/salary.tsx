import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import React from 'react';
import ManagerScreen from 'src/app.features/calendar/screens/ManagerScreen';
import WorkerScreen from 'src/app.features/calendar/screens/WorkerScreen';
import { getUser } from 'src/app.modules/api/user';

interface Props {
	children: React.ReactElement | null;
}

const isAdmin = (): boolean => {
	// 점장 유효성 검사
	return true;
};

const Admin: React.FC<Props> = ({ children }) => {
	if (!isAdmin()) {
		return <WorkerScreen />;
	}
	return children;
};

const SalaryPage: NextPage = () => {
	return (
		<Admin>
			<ManagerScreen />
		</Admin>
	);
};

export default SalaryPage;
