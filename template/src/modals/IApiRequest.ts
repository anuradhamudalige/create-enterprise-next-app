import { ResponseType } from 'axios';

export interface IApiRequest {
  endpoint: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  type?: ResponseType;
  params?: any;
}