import { ConfigClient } from '@/server/external/api/rcs/ConfigClient';
import { injectable } from 'inversify';

@injectable()
export class ConfigClientImpl implements ConfigClient {
  async getConfiguration(): Promise<ConfigResponse> {
    // fetch the configuration via external API and return the config
    return Promise.resolve({});
  }
}
