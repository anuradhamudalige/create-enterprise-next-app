import { Method, ResponseType } from 'axios';

export interface IRequest {
  baseUrl?: string;
  endpoint?: string;
  method?: Method;
  headers?: Headers,
  payload?: any,
  type?: ResponseType
}

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface Headers {
  [key: string]: string;
}
