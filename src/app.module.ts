import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/connection/config.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DateInterceptor } from './config/core/dateInterceptor';
import { IndexModule } from './modules/index.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'),
          filename: 'debug.log',
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.Console({ level: 'debug' }),
      ],
    }),
    IndexModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DateInterceptor,
    }
  ],
})
export class AppModule { }
