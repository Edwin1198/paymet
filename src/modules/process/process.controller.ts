import { Body, Controller, Patch } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProcessService } from './process.service';
import { TicketsSoldDto } from './resource/process.dto';
// import { PurchasingProcessDto } from './resource/process.dto';
// import { TicketDto } from '../ticket/resource';

@ApiCreatedResponse()
@ApiTags('PROCESO')
@Controller('process')
export class ProcessController {
  constructor(private readonly service: ProcessService) {}
  @ApiOperation({ summary: 'Boletos vendidos' })
  @ApiBody({
    type: TicketsSoldDto,
    description: 'Boleto',
  })
  // @ApiResponse({
  //     status: 200,
  //     description: 'Boleto creado',
  //     type: TicketDto,
  // })
  @Patch('tickets-sold')
  async ticketsSold(@Body() data: TicketsSoldDto) {
    return this.service.ticketsSold(data);
  }
}
