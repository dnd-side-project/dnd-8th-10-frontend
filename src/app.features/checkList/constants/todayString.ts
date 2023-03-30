import { formatDate } from 'src/app.modules/util/formatDate';
import { getKoreaTodayDateInfo } from '../utils/getKoreaTodayDateInfo';

export const TODAY_STRING = ((): string => {
	const { year, month, date } = getKoreaTodayDateInfo();
	return formatDate(year, month, date);
})();
