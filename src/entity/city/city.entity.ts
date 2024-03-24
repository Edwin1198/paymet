import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('city', { database: 'travel_db', schema: 'public' })
export class CityEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'numeric', name: 'id_city' })
  id: number | null;

  @Column({ type: 'character varying', name: 'department', length: 100 })
  department: string | null;

  @Column({ type: 'character varying', name: 'province', length: 100 })
  province: string | null;

  @Column({ type: 'character varying', name: 'district', length: 100 })
  district: string | null;
}
