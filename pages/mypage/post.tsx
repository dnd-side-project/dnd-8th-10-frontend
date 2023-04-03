import { InitialDataFunction, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import TitleHead from 'src/app.components/TitleHead';
import { PostDatas } from 'src/app.features/board/types';
import MyPostScreen from 'src/app.features/mypage/screens/MyPostScreen';
import { getUserPost } from 'src/app.modules/api/user';

interface Props {
	serverData?: any;
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const { req } = context;
	const API_URL = 'https://wise24life.shop/api/myPost';
	const token = req.cookies.wiseat; // 쿠키에서 토큰 추출
	const headers = { Authorization: `Bearer ${token}` }; // 헤더 설정
	const { data } = await axios.get(API_URL, { headers }); // API 요청
	return { props: { serverData: data } };
};

function myPost({ serverData }: Props) {
	return (
		<>
			<TitleHead title="내가 쓴 글" />
			<MyPostScreen posts={serverData?.data} />
		</>
	);
}

export default myPost;
