import { Module } from '@nestjs/common';
import { PayModule } from './pay/pay.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [PayModule, ProcessModule],
})
export class IndexModule {}
