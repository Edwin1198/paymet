import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { CityEntity } from "../city/city.entity";

@Entity("pay", { database: 'travel_db', schema: "public" })
export class PayEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_pay' })
    id: number;

    @Column({ type: 'numeric', precision: 10, scale: 2, name: 'price' })
    price: number;

    @Column({ type: 'time', name: 'travel_time' })
    travelTime: string;

    @Column({ type: 'numeric', name: 'origin_destination' })
    originDestination: number;

    @Column({ type: 'numeric', name: 'final_destination' })
    finalDestination: number;

    @ManyToOne(() => CityEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'origin_destination', referencedColumnName: 'id' })
    originCity: CityEntity;

    @ManyToOne(() => CityEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'final_destination', referencedColumnName: 'id' })
    finalCity: CityEntity;
}