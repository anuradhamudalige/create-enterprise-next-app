import { NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';

export function createErrorResponse(message: string, status: number = HttpStatusCode.InternalServerError) {
  return new NextResponse(
    JSON.stringify({ status: 'ERROR', message }),
    {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  );
}

