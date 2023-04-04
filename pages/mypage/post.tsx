import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TitleHead from 'src/app.components/TitleHead';
import MyPostScreen from 'src/app.features/mypage/screens/MyPostScreen';
import { getUserPost } from 'src/app.modules/api/user';

function myPost() {
	const { data } = useQuery(['user', 'post'], getUserPost, {
		select: (res) => res.data.data,
	});
	return (
		<>
			<TitleHead title="내가 쓴 글" />
			<MyPostScreen posts={data} />
		</>
	);
}

export default myPost;
