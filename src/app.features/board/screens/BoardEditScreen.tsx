import React from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { WriteBody } from '../api';
import BoardEditor from '../components/BoardEditor';
import { boardViewDatas } from '../types';

interface Props {
	id: string | string[] | undefined;
	UserData: {
		role: string;
	};
	boardViewData: boardViewDatas;
	BoardModifyMutate: MutateTpye<WriteBody>;
}

function BoardEditScreen({ id, UserData, boardViewData, BoardModifyMutate }: Props) {
	return <BoardEditor id={id} UserData={UserData} boardViewData={boardViewData} BoardMutate={BoardModifyMutate} />;
}
export default BoardEditScreen;
