import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProcessController],
  providers: [ProcessService,
    {
      provide: 'ms-0001-order-service',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ORDEN_Y_SERVICIO_HOST_NAME'),
            port: configService.get('ORDEN_Y_SERVICIO_HOST_PORT'),
          },
        }),
    },
    {
      provide: 'ms-0001-catalogo',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CATALOGOS_HOST_NAME'),
            port: configService.get('CATALOGOS_HOST_PORT'),
          },
        }),
    }
  ]
})
export class ProcessModule {}
