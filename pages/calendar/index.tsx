import type { NextPage } from 'next';
import CalendarScreen from 'src/app.features/calendar/screens/CalendarScreen';

const CalendarPage: NextPage = () => {
	return (
		<div className="h-[100vh]">
			<CalendarScreen />
		</div>
	);
};

export default CalendarPage;
