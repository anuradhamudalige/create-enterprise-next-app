import { ApplicationService } from '@/server/application/common/ApplicationService';
import { inject, injectable } from 'inversify';
import { DiTypes } from '@/server/application/container/DiTypes';
import type { ConfigClient } from '@/server/external/api/rcs/ConfigClient';
import { ObjectUtil } from '@/util/ObjectUtil';
import { logger } from '@/util/logger';

@injectable()
  export class ApplicationManager implements ApplicationService {
  private configuration: TypeOrUndefined<ConfigResponse>;
  constructor(@inject(DiTypes.ConfigClient) private configClient: ConfigClient) {
  }

  async initialize(): Promise<void> {
    if(ObjectUtil.isNotEmpty(this.configuration))
      return Promise.resolve();

    logger.info('Initializing application manager');
    this.configuration = await this.configClient.getConfiguration();
    this.patchVariables(this.configuration);
    return Promise.resolve();
  }

  patchVariables(configuration: ConfigResponse) {
    // patch to process.env
    logger.info('Patching variables');
  }
}
