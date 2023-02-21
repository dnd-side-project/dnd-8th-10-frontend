export const getSplittedWorkPlaceString = (workPlace: string) => {
	const splited = workPlace.split(' ');
	return `${splited[0]}편의점/${splited[1]}`;
};
