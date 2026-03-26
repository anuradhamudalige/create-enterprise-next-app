import { NextResponse } from 'next/server';
import { logger } from '@/util/logger';
import { HttpStatusCode } from 'axios';
import { promises as fs } from 'fs';
import { createErrorResponse } from '@/util/responseUtil';

export const GET = async (): Promise<Response> => {
  logger.info('Retrieving newrelic browser agent script');
  try {
    const file = await fs.readFile(process.cwd() + `/apm/newrelic/${process.env.NEWRELIC_AGENT_SCRIPT_FILENAME}`, 'utf8');
    return new NextResponse(file, {
      status: HttpStatusCode.Ok,
      headers: {
        'Content-Type': 'application/x-javascript',
      },
    });
  } catch (e) {
    logger.error('Failed to retrieve newrelic agent script', e);
    return createErrorResponse('Failed to retrieve newrelic agent script', HttpStatusCode.InternalServerError);
  }
};

export const dynamic = 'force-dynamic';