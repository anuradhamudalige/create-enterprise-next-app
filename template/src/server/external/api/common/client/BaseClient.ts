import { IRequest } from '@/server/external/api/common/model/RequestTypes';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import axiosRetry from 'axios-retry';
import { logger } from '@/util/logger';

const MAX_RETRIES = 3;

export abstract class BaseClient {
  abstract onRetry(error: AxiosError, requestConfig: AxiosRequestConfig): Promise<void>;
  protected constructor() {}
  /**
   * Executes the request with retry logic for specific HTTP status codes.
   * @param request The request object containing the details of the request.
   * @returns The Axios response.
   */
  protected async execute(request: IRequest): Promise<AxiosResponse> {
    const url = encodeURI(`${request.baseUrl}${request.endpoint}`);

    axiosRetry(axios, {
      retries: MAX_RETRIES,
      retryCondition: (error) => {
        switch (error.response?.status) {
          case HttpStatusCode.Forbidden:
          case HttpStatusCode.Unauthorized:
          case HttpStatusCode.TooManyRequests:
            return true;
          default:
            return false;
        }
      },
      retryDelay: (retryCount, error) => {
        return axiosRetry.exponentialDelay(retryCount, error, 1000);
      },
      onRetry: async (retryCount, error, requestConfig) => {
        logger.info(`Retrying: for status code ${error.response?.status} and error ${JSON.stringify(error.response?.data)}, retry count ${retryCount}`);
        await this.onRetry(error, requestConfig);
      },
    });

    return await axios({
      method: request.method,
      url,
      headers: request.headers,
      data: request.payload,
      responseType: request.type || 'json',
    });
  }
}