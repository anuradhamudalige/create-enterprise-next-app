import { NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';

export const GET = async (): Promise<Response> => {
  return new NextResponse(JSON.stringify({status: 'ok', message: 'Service is up and running'}), {
    status: HttpStatusCode.Ok,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const dynamic = 'force-dynamic';