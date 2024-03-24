import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Message } from 'src/config/helper/message-validator.helper';

export class TicketsSoldDto {
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: Message.IsDate('$property') })
  @ApiProperty({
    title: 'date_of_purchase',
    example: '2024-03-18',
    required: false,
  })
  dateOfPurchase: Date | null;

  @Type(() => String)
  @IsOptional()
  @IsString({ message: Message.STRING('$property') })
  @ApiProperty({
    title: 'n_bus',
    example: '12',
    required: false,
  })
  busNumber: string;
}
