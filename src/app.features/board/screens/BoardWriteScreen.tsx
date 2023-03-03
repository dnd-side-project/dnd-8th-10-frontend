import React from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { WriteBody, WriteImgBody } from '../api';
import BoardEditor from '../components/BoardEditor';

interface Props {
	UserData: {
		role: string;
	};
	BoardWriteMutate: MutateTpye<WriteBody>;
	BoardWriteImgMutate: MutateTpye<WriteImgBody>;
}

function BoardWriteScreen({ UserData, BoardWriteMutate, BoardWriteImgMutate }: Props) {
	return <BoardEditor UserData={UserData} BoardMutate={BoardWriteMutate} BoardWriteImgMutate={BoardWriteImgMutate} />;
}
export default BoardWriteScreen;
