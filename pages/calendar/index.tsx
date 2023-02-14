import type { NextPage } from 'next';
import CalendarScreen from 'src/app.features/calendar/screens/CalendarScreen';

const CalendarPage: NextPage = () => {
	return (
		<div className="w-full h-[100vh] relative">
			<CalendarScreen />
		</div>
	);
};

export default CalendarPage;
