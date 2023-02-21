import type { NextPage } from 'next';
import Navigation from 'src/app.components/Navigation';
import CalendarScreen from 'src/app.features/calendar/screens/CalendarScreen';

const CalendarPage: NextPage = () => {
	return (
		<div className="h-[100vh]">
			<CalendarScreen />
			<Navigation />
		</div>
	);
};

export default CalendarPage;
