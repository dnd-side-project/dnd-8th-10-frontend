import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import CheckSmallIcon from '../../../app.modules/assets/board/checkSmall.svg';
import { boardCheckCategory } from '../api';
import useStore from '../store';
import { categoryMapEng, categoryMapKr, formatDate } from '../utils';
import { PostDatas } from '../types';

interface Props {
	searchData?: PostDatas[];
	search?: boolean;
}

function BoardPreview({ searchData, search = false }: Props) {
	const router = useRouter();
	const { selectedCategory } = useStore();
	const [boardData, setBoardData] = useState<PostDatas[]>([]);

	useEffect(() => {
		if (search) {
			setBoardData([]);
			if (searchData) {
				setBoardData(searchData);
			}
		} else if (selectedCategory) {
			const data = boardCheckCategory(categoryMapEng[selectedCategory]);
			data.then((res) => {
				setBoardData(res.data.data.sort((a: { postId: number }, b: { postId: number }) => b.postId - a.postId));
			});
		}
	}, [selectedCategory, searchData, search]);

	return (
		<div>
			{boardData?.map((post, index) => (
				<div
					role="presentation"
					key={index}
					className="first:pt-[0rem] py-[1.2rem] border-solid border-b-[0.05rem] border-b-g3 h-fit"
					onClick={() => router.push(`${SERVICE_URL.boardView}/${post.postId}`)}
				>
					<div>
						<span className="text-subhead2 text-g9">{post.title}</span>
					</div>
					<div className="flex justify-between">
						<div className="text-body1">
							<span className="text-secondary mr-[0.4rem]">{categoryMapKr[post.category]}</span>
							<span className="text-g7">
								{post.userName} {post.role === 'MANAGER' ? '점장' : '알바생'} {formatDate(post.createDate)}
							</span>
						</div>
						<div className="flex items-center">
							<CheckSmallIcon /> <span className="text-body1 text-g6 ml-[0.4rem]">{post.checkCount}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default BoardPreview;
