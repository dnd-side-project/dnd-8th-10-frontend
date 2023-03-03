import React, { useEffect } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { WriteImgBody } from '../api';

interface Props {
	postId: number;
	FormData: FormData;
	BoardWriteImgMutate: MutateTpye<WriteImgBody>;
}

function BoardImgUploadScreen({ postId, FormData, BoardWriteImgMutate }: Props) {
	useEffect(() => {
		BoardWriteImgMutate({ postId, FormData });
	}, [postId, FormData]);

	return <div></div>;
}

export default BoardImgUploadScreen;
