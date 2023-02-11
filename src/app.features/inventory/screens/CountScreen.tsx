import Link from 'next/link';
import React from 'react';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

function CountScreen() {
	return (
		<div>
			<ul>
				<li>
					<Link href={SERVICE_URL.countCigarette}>담배</Link>
				</li>
				<li>
					<Link href={SERVICE_URL.countBag}>쓰레기 봉투</Link>
				</li>
				<li>
					<Link href={SERVICE_URL.countCard}>문화 상품권</Link>
				</li>
			</ul>
		</div>
	);
}

export default CountScreen;
