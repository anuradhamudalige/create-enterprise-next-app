import 'reflect-metadata';
import { Container } from 'inversify';
import { DiTypes } from '@/server/application/container/DiTypes';
import { logger } from '@/util/logger';
import { ApplicationService } from '@/server/application/common/ApplicationService';
import { ApplicationManager } from '@/server/application/common/ApplicationManager';
import { ConfigClient } from '@/server/external/api/rcs/ConfigClient';
import { ConfigClientImpl } from '@/server/external/api/rcs/ConfigClientImpl';

declare global {
  var __container: Container | undefined;
}

export const getContainer = (): Container => {
  if (!global.__container) {
    logger.info('Creating new container');
    global.__container = new Container({
      defaultScope: 'Singleton',
    });

    global.__container.bind<ApplicationService>(DiTypes.ApplicationService).to(ApplicationManager);
    global.__container.bind<ConfigClient>(DiTypes.ConfigClient).to(ConfigClientImpl);

  }

  return global.__container;
};

export const getInjection = <T>(symbol: symbol): T => {
  return getContainer().get<T>(symbol);
};
