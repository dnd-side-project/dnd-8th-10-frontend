export const formatDate = (year: number, month: number, date: number) => {
	return `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`;
};
