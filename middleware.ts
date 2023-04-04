import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest, res: NextResponse) {
	console.dir('미들웨어', req);
	return NextResponse.next();
}
export const config = {};
