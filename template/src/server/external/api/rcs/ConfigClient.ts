export interface ConfigClient {
  getConfiguration(): Promise<ConfigResponse>;
}