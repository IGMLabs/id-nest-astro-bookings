import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { CoreModule } from "src/core/core.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "src/trips/entities/trip.entity";
import { Booking } from "./entities/booking.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Trip]), CoreModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
