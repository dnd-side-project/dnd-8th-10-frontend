import { useRouter } from 'next/router';
import HomeIcon from 'src/app.modules/assets/home/home.svg';
import CalendarIcon from 'src/app.modules/assets/home/calendar.svg';
import BoardIcon from 'src/app.modules/assets/home/board.svg';
import MyIcon from 'src/app.modules/assets/home/my.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Link from 'next/link';

function Navigation() {
	const router = useRouter();
	return (
		<footer className="bg-w flex items-center h-[5.6rem] fixed bottom-0 max-w-[50rem] -translate-x-[2rem] mx-auto w-full border-solid border-t-[0.05rem] border-g3">
			<nav className="flex w-full">
				<ul className="flex justify-between mx-[3rem] w-full">
					<li>
						<Link href={SERVICE_URL.home} className="flex flex-col items-center">
							<HomeIcon stroke={`${router.pathname === `${SERVICE_URL.home}` ? '#66666E' : '#E8E8EB'}`} />
							<div className={`${router.pathname === `${SERVICE_URL.home}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
								홈
							</div>
						</Link>
					</li>
					<li>
						<Link href={SERVICE_URL.calendar} className="flex flex-col items-center">
							<CalendarIcon fill={`${router.pathname === `${SERVICE_URL.calendar}` ? '#66666E' : '#E8E8EB'}`} />
							<div className={`${router.pathname === `${SERVICE_URL.calendar}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
								출근기록
							</div>
						</Link>
					</li>
					<li>
						<Link href={SERVICE_URL.board} className="flex flex-col items-center">
							<BoardIcon stroke={`${router.pathname === `${SERVICE_URL.board}` ? '#66666E' : '#E8E8EB'}`} />
							<div className={`${router.pathname === `${SERVICE_URL.board}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
								게시판
							</div>
						</Link>
					</li>
					<li>
						<Link href={SERVICE_URL.mypage} className="flex flex-col items-center">
							<MyIcon stroke={`${router.pathname === `${SERVICE_URL.mypage}` ? '#66666E' : '#E8E8EB'}`} />
							<div className={`${router.pathname === `${SERVICE_URL.mypage}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
								마이페이지
							</div>
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
}
export default Navigation;
