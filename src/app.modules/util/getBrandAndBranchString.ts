/**
 * 근무지 ${brand}편의점/${branch}형태로 표현하는 함수
 * @param workPlace 회원가입시 입력한 근무지 string ex) GS25 강남동원점.
 * @return GS25편의점/강남동원점
 */
export const getBrandAndBranchString = (workPlace: string): string => {
	const [brand, branch] = workPlace.split(' ');
	return `${brand}편의점/${branch}`;
};
