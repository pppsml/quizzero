import { BaseService } from './services/base';
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export const ProvidersOptsSymbol = Symbol();

export type Opts = {
  baseUri: string;
  services: BaseService[];
};

export type AsyncOpts = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<Opts>, 'useFactory' | 'inject'>;