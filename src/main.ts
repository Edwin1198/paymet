import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DateInterceptor } from './config/core/dateInterceptor';

const title = process.env.TITLE ? process.env.TITLE : 'TITLE';
const subtitle = process.env.SUBTITLE ? process.env.SUBTITLE : 'SUBTITLE';
const descripcion = process.env.DESCRIPCION
  ? process.env.DESCRIPCION
  : 'DESCRIPCION';
const version = process.env.VERSION ? process.env.VERSION : '1.0';
const ENV = process.env.ENV ? process.env.ENV : '';
const app_port = process.env.HOST_PORT ? +process.env.HOST_PORT : 3000;
const ms_port_micro = process.env.MS_PORT_MICRO
  ? +process.env.MS_PORT_MICRO
  : 4000;
const host_name = process.env.HOST_NAME ? process.env.HOST_NAME : '0.0.0.0';
new Logger(subtitle);

function configureSwagger(app: any): void {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(descripcion)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('');
  app.enableCors({ origin: '*' });

  app.useGlobalInterceptors(new DateInterceptor());

  configureSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: host_name,
      port: ms_port_micro,
    },
  });

  await app.startAllMicroservices();
  await app.listen(app_port);
  Logger.log(`Microservicio corriendo en el ambiente: ${ENV}`, ENV);
  Logger.log(`Microservice name: ${title}`, title);
  Logger.log(`Microservices endpoints port ${app_port}`, `${app_port}`);
  Logger.log(`Microservice port: ${ms_port_micro}`, `${ms_port_micro}`);
  Logger.log(`Microservice url ${await app.getUrl()}`, `URL`);
}
bootstrap();
