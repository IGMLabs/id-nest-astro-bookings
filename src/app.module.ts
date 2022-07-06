import { Module } from "@nestjs/common";
import { AgenciesModule } from "./agencies/agencies.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { TripsModule } from './trips/trips.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [CoreModule, AgenciesModule, AuthModule, TripsModule, BookingsModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
