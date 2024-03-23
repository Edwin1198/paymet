import { FilterOperator, FilterSuffix, PaginateConfig } from "nestjs-paginate"
import { PayEntity } from 'src/entity';

const dataBd =
    ['id', 'price', 'travelTime',
        'originCity.id', 'originCity.department', 'originCity.province', 'originCity.district',
        'finalCity.id', 'finalCity.department', 'finalCity.province', 'finalCity.district']

export const PayConfig: PaginateConfig<PayEntity> = {
    sortableColumns: ['id', 'price', 'travelTime', 'originDestination', 'finalDestination',
        'originCity.id', 'originCity.department', 'originCity.province', 'originCity.district',
        'finalCity.id', 'finalCity.department', 'finalCity.province', 'finalCity.district'],
    nullSort: 'last',
    defaultSortBy: [['id', 'DESC']],
    searchableColumns: ['id', 'price', 'travelTime', 'originDestination', 'finalDestination',
        'originCity.id', 'originCity.department', 'originCity.province', 'originCity.district',
        'finalCity.id', 'finalCity.department', 'finalCity.province', 'finalCity.district'],
    select: dataBd,
    relations: ['originCity', 'finalCity'],
    filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
        price: [FilterOperator.EQ, FilterSuffix.NOT],
        travelTime: [FilterOperator.EQ, FilterSuffix.NOT],
        originDestination: [FilterOperator.EQ, FilterSuffix.NOT],
        finalDestination: [FilterOperator.EQ, FilterSuffix.NOT],
        'originCity.id': [FilterOperator.EQ, FilterSuffix.NOT],
        'originCity.department': [FilterOperator.EQ, FilterSuffix.NOT],
        'originCity.province': [FilterOperator.EQ, FilterSuffix.NOT],
        'originCity.district': [FilterOperator.EQ, FilterSuffix.NOT],
        'finalCity.id': [FilterOperator.EQ, FilterSuffix.NOT],
        'finalCity.department': [FilterOperator.EQ, FilterSuffix.NOT],
        'finalCity.province': [FilterOperator.EQ, FilterSuffix.NOT],
        'finalCity.district': [FilterOperator.EQ, FilterSuffix.NOT]
    },
}
