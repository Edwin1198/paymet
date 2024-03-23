import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PayService } from './pay.service';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated, PaginatedSwaggerDocs } from 'nestjs-paginate';
import { PayDto, PayDtoId, PayConfig } from './resource';
import { PayEntity } from 'src/entity';
import { CRUDOBody, CRUDOParam, CRUDOResponse, CRUDOperation } from 'src/config/helper/message-res.helper';

@ApiCreatedResponse()
@ApiTags('PAGO')
@Controller('pay')
export class PayController {
    constructor(private readonly service: PayService) { }
    @ApiOperation({ summary: 'Paginación de todos los registros' })
    @ApiOkPaginatedResponse(PayDtoId, PayConfig)
    @ApiPaginationQuery(PayConfig)
    @PaginatedSwaggerDocs(PayDtoId, PayConfig)
    @Get()
    async finAll(@Paginate() query: PaginateQuery): Promise<Paginated<PayEntity>> {
        return await this.service.findAll(query);
    }
    @ApiOperation({ summary: CRUDOperation.post })
    @ApiBody({
        type: PayDto,
        description: CRUDOBody.postDescription,
    })
    @ApiResponse({
        status: CRUDOResponse.postStatus,
        description: CRUDOResponse.postDescription,
        type: PayDto,
    })
    @Post()
    async post(@Body() data: PayDto): Promise<PayDto | {}> {
        return this.service.post(data);
    }
    @ApiOperation({ summary: CRUDOperation.put })
    @ApiParam({
        name: CRUDOParam.putName,
        example: 1,
        type: Number
    })
    @ApiBody({
        type: PayDto,
        description: CRUDOBody.putDescription,
    })
    @ApiResponse({
        status: CRUDOResponse.putStatus,
        description: CRUDOResponse.putDescription,
        type: PayDto,
    })
    @Put(':id')
    async put(@Param('id', ParseIntPipe) id: number, @Body() data: PayDto): Promise<PayDto | {}> {
        return this.service.put({ id, data });
    }
    @ApiOperation({ summary: CRUDOperation.delete })
    @ApiParam({
        name: CRUDOParam.deleteName,
        example: 1,
        type: Number
    })
    @ApiResponse({
        status: CRUDOResponse.deleteStatus,
        description: CRUDOResponse.deleteDescription,
        type: Object
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{}> {
        return this.service.delete(id);
    }
}
