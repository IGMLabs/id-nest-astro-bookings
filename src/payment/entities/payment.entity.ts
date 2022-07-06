import { IsString } from "class-validator";
import { Booking } from "src/bookings/entities/booking.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Booking)
  booking: Booking;

  @Column()
  @IsString()
  card: string;

  @Column({ type: "double" })
  amount: number;
}
