import React from 'react';
import Badge from 'src/app.components/app.base/Button/Badge';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import { getUserWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import EditIcon from 'src/app.modules/assets/edit.svg';
import Bar from 'src/app.components/app.base/Button/Bar';
import Link from 'next/link';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { MutateUserBodyType } from 'src/app.modules/api/user';
import useRegisterUserStore from '../store';

interface Props {
	postUserMutate: MutateTpye<MutateUserBodyType>;
	isLoading: boolean;
}
// TODO: 시급형식 맞춰주기 (,추가)
function LastCheckScreen({ postUserMutate, isLoading }: Props) {
	const {
		userForm: { phoneNumber, role, workPlace, workTimeObj, workLocation, wage },
	} = useRegisterUserStore();
	const submitHandler = () => {
		console.log('제출');
		if (isLoading) return;
		if (!role || !workPlace || !workTimeObj || !workLocation || !wage) {
			alert('필수 정보를 모두 입력해주세요.');
			return;
		}
		const workTimeString = getUserWorkTimeString(workTimeObj);

		// TODO: 요일 입력 받기
		const body = {
			role,
			workPlace,
			workTime: workTimeString,
			workLocation,
			phoneNumber: !phoneNumber?.trim() ? null : phoneNumber,
			wage, // TODO:급여필드 만들기
		};
		console.log(body);
		postUserMutate(body);
	};
	return (
		<>
			<Header title="" />
			<main className="h-full  pt-[9rem] space-y-[1.6rem] relative">
				<h1 className="text-g10 text-title2">마지막으로 확인해주세요! 🧐</h1>
				<ul className="space-y-[3rem] pb-[9rem]">
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">역할</span>
						<Badge size="small" color="warmGray">
							<Link href={`${SERVICE_URL.register}?page=1&title=역할 수정`}>
								<div className="flex items-center space-x-[0.4rem]">
									<span className="text-body2">{role === 'MANAGER' ? '점장' : '알바생'}</span>
									<EditIcon className="mt-[0.12rem]" />
								</div>
							</Link>
						</Badge>
					</li>
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">지점 수정</span>
						<Badge size="small" color="warmGray">
							<Link href={`${SERVICE_URL.register}?page=2&title=지점 수정`}>
								<div className="flex items-center space-x-[0.4rem]">
									<span className="text-body2">{workPlace}</span>
									<EditIcon className="mt-[0.12rem]" />
								</div>
							</Link>
						</Badge>
					</li>
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">근무 일시</span>
						{workTimeObj &&
							getUserWorkTimeString(workTimeObj)
								.split(',')
								.map((time, idx) => (
									<li key={`time-${idx}`}>
										<button>
											<Badge size="small" color="warmGray">
												<Link href={`${SERVICE_URL.register}?page=3&title=근무 일시 수정`}>
													<div className="flex items-center space-x-[0.4rem]">
														<span className="text-body2">{time}</span> <EditIcon className="mt-[0.12rem]" />
													</div>
												</Link>
											</Badge>
										</button>
									</li>
								))}
					</li>
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">전화번호</span>

						<Badge size="small" color="warmGray">
							<Link href={`${SERVICE_URL.register}?page=4&title=전화번호 수정`}>
								<div className="flex items-center space-x-[0.4rem]">
									<span className="text-body2">{phoneNumber}</span>
									<EditIcon className="mt-[0.12rem]" />
								</div>
							</Link>
						</Badge>
					</li>
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">시급</span>
						<Badge size="small" color="warmGray">
							<Link href={`${SERVICE_URL.register}?page=5&title=시급 수정`}>
								<div className="flex items-center space-x-[0.4rem]">
									<span className="text-body2">
										{wage}
										{wage && '원'}
									</span>
									<EditIcon className="mt-[0.12rem]" />
								</div>
							</Link>
						</Badge>
					</li>
				</ul>
				<div className="fixed max-w-[50rem] translate-x-[-2rem] px-[2rem] bottom-[2rem] w-full">
					<Bar ClickFn={submitHandler}>확인</Bar>
				</div>
			</main>
		</>
	);
}

export default LastCheckScreen;
