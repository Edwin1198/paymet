import { Module } from '@nestjs/common';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity, PayEntity } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity, PayEntity])],
  controllers: [PayController],
  providers: [PayService]
})
export class PayModule {}
