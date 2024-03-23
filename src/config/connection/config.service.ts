import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST') ? this.getValue('DB_HOST') : 'localhost',
      port: this.getValue('POSTGRES_PORT') ? +this.getValue('POSTGRES_PORT') : 5432,
      username: this.getValue('POSTGRES_USER') ? this.getValue('POSTGRES_USER') : 'postgres',
      password: this.getValue('DB_PASS') ? this.getValue('DB_PASS') : '123',
      database: this.getValue('POSTGRES_DB') ? this.getValue('POSTGRES_DB') : 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'DB_PASS',
  'POSTGRES_DB',
]);

export { configService };