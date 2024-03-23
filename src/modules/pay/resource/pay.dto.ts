import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from 'src/config/helper/message-validator.helper';

export class PayDto {

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'price',
        example: '30',
        required: false,
    })
    price: number;

    @Type(() => String)
    @IsOptional()
    @IsString({ message: Message.STRING('$property') })
    @ApiProperty({
        title: 'travelTime',
        example: '04:00:00',
        required: false,
    })
    travelTime: string;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'originDestination',
        example: '1',
        required: false,
    })
    originDestination: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'finalDestination',
        example: '2',
        required: false,
    })
    finalDestination: number;
    
}

export class PayDtoId extends PayDto {

    @Type(() => Number)
    @IsNumber({}, { message: Message.NUMBER('$property') })
    @ApiProperty({
        title: 'id_pay',
        example: '1',
        required: true,
    })
    id: number;

}