import type { NextPage } from 'next';
import Navigation from 'src/app.components/Navigation';
import CalendarScreen from 'src/app.features/calendar/screens/CalendarScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

const CalendarPage: NextPage = () => {
	const { data } = useUser();

	return (
		<div className="h-[100vh]">
			<CalendarScreen currentUser={data?.userName} />
			<Navigation />
		</div>
	);
};

export default CalendarPage;
