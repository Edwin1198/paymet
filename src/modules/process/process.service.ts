import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PayEntity } from 'src/entity';
import { TicketsSoldDto } from './resource/process.dto';

@Injectable()
export class ProcessService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @Inject('ms-0001-order-service')
    private readonly orderServiceProxy: ClientProxy,
    @Inject('ms-0001-catalogo') private readonly catalogoProxy: ClientProxy,
  ) {}

  async ticketsSold(data: TicketsSoldDto) {
    const { dateOfPurchase, busNumber } = data;
    let message: string = null;
    try {
      let newTicket = [];
      try {
        newTicket = await lastValueFrom(
          this.orderServiceProxy.send(
            { cmd: 'ticketDayPrice' },
            { dateOfPurchase, busNumber },
          ),
        );
      } catch (error) {
        message = 'Microservico en mantenimiento';
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const resut = [];
      for (const iterator of newTicket) {
        const data = await this.entityManager
          .createQueryBuilder(PayEntity, 'pay')
          .where('pay.id = :payId', { payId: iterator.horaryId })
          .getMany();

        let newHorari = [];
        try {
          newHorari = await lastValueFrom(
            this.orderServiceProxy.send(
              { cmd: 'horaryView' },
              iterator.horaryId,
            ),
          );
        } catch (error) {
          message = 'Microservico en mantenimiento';
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: message,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        let newVehicle = [];
        if (newHorari.length > 0) {
          try {
            newVehicle = await lastValueFrom(
              this.catalogoProxy.send(
                { cmd: 'vehicleView' },
                newHorari[0].vehicle,
              ),
            );
          } catch (error) {
            message = 'Microservico en mantenimiento';
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: message,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        }
        data.forEach((element) => {
          resut.push({
            busNumber: newVehicle.length > 0 ? newVehicle[0].busNumber : 0,
            dateOfPurchase: iterator.dateOfPurchase,
            price: element.price,
          });
        });
      }
      return resut;
    } catch (error) {
      Logger.error(error.message);
      throw new HttpException(
        {
          message: message ? message : error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
