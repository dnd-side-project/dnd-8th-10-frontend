import React from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { WriteBody } from '../api';
import BoardEditor from '../components/BoardEditor';

interface Props {
	UserData: {
		role: string;
	};
	BoardWriteMutate: MutateTpye<WriteBody>;
}

function BoardWriteScreen({ UserData, BoardWriteMutate }: Props) {
	return <BoardEditor UserData={UserData} BoardMutate={BoardWriteMutate} />;
}
export default BoardWriteScreen;
