import { NextResponse } from 'next/server';
import { getInjection } from '@/server/application/container/Container';
import { ApplicationService } from '@/server/application/common/ApplicationService';
import { DiTypes } from '@/server/application/container/DiTypes';
import { HttpStatusCode } from 'axios';

export const GET = async (): Promise<Response> => {

  const applicationService = getInjection<ApplicationService>(DiTypes.ApplicationService);
  await applicationService.initialize();

  return new NextResponse(JSON.stringify({status: 'SUCCESS'}), {
    status: HttpStatusCode.Ok,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const dynamic = 'force-dynamic';