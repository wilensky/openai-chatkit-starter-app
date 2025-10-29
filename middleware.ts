import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } = process.env;

export function middleware(request: NextRequest) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pass] = Buffer.from(authValue, 'base64').toString().split(':');

        if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASSWORD) {
            return NextResponse.next();
        }
    }

    return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        }
    });
}

export const config = {
    matcher: '/'
};