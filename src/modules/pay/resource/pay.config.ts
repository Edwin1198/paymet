import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate"
import { PayEntity } from 'src/entity';

const dataBd = ['id', 'price', 'travelTime', 'originDestination', 'finalDestination']

export const PayConfig: PaginateConfig<PayEntity> = {
    sortableColumns: ['id', 'price', 'travelTime', 'originDestination', 'finalDestination'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['id', 'price', 'travelTime', 'originDestination', 'finalDestination'],
    select: dataBd,
    relations: ['originCity', 'finalCity'],
    filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        price: [FilterOperator.EQ, FilterSuffix.NOT],
        travelTime: [FilterOperator.EQ, FilterSuffix.NOT],
        originDestination: [FilterOperator.EQ, FilterSuffix.NOT],
        finalDestination: [FilterOperator.EQ, FilterSuffix.NOT],
        originCity: [FilterOperator.EQ, FilterSuffix.NOT],
        finalCity: [FilterOperator.EQ, FilterSuffix.NOT]
    },
}
