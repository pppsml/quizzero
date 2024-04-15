import { DynamicModule, Module } from "@nestjs/common";

import { AsyncOpts, Opts, ProvidersOptsSymbol } from "./constants";
import { ProvidersService } from "./provides.service";


@Module({})
export class ProvidersModule {

  static register(opts: Opts): DynamicModule {
    return {
      module: ProvidersModule,
      providers: [
        {
          useValue: opts.services,
          provide: ProvidersOptsSymbol,
        },
        ProvidersService,
      ],
      exports: [ProvidersService],
    }
  }

  static registerAsync(opts: AsyncOpts): DynamicModule {
    return {
      module: ProvidersModule,
      imports: opts.imports,
      providers: [
        {
          useFactory: opts.useFactory,
          provide: ProvidersOptsSymbol,
          inject: opts.inject,
        },
        ProvidersService,
      ],
      exports: [ProvidersService],
    }
  }
}