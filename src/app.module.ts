import { Module } from "@nestjs/common";
import { AgenciesModule } from "./agencies/agencies.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";

@Module({
  imports: [CoreModule, AgenciesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
