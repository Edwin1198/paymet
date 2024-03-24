import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { PayConfig, PayDto } from './resource';
import { PayEntity } from 'src/entity';
import { CRUDOLogger } from 'src/config/helper/message-res.helper';

@Injectable()
export class PayService {
  constructor(
    @InjectRepository(PayEntity)
    private readonly repository: Repository<PayEntity>,
  ) {}
  async findAll(query: PaginateQuery): Promise<Paginated<PayEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('table');
    return paginate(query, queryBuilder, PayConfig);
  }
  async post(data: PayDto): Promise<PayDto | any> {
    try {
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(PayEntity)
        .values({ ...data })
        .execute();
      return data;
    } catch (error) {
      Logger.error(error.message, CRUDOLogger.titlePost);
      return {};
    }
  }
  async put({ id, data }: { id: number; data: PayDto }): Promise<PayDto | any> {
    try {
      const { affected } = await this.repository
        .createQueryBuilder()
        .update(PayEntity)
        .set({ ...data })
        .where('id = :id', { id })
        .execute();
      if (affected === 0) {
        Logger.warn(CRUDOLogger.descripcionId, CRUDOLogger.titlePut);
      }
      return { ...data };
    } catch (error) {
      Logger.error(error.message, CRUDOLogger.titlePut);
      return {};
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const { affected } = await this.repository
        .createQueryBuilder()
        .delete()
        .from(PayEntity)
        .where('id = :id', { id })
        .execute();
      if (affected === 0) {
        Logger.warn(CRUDOLogger.descripcionId, CRUDOLogger.titleDelete);
      }
      return {};
    } catch (error) {
      Logger.error(error.message, CRUDOLogger.titleDelete);
      return {};
    }
  }
}
