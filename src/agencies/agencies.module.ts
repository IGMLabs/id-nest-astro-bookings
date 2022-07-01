import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoreModule } from "src/core/core.module";
import { AgenciesController } from "./agencies.controller";
import { AgenciesService } from "./agencies.service";
import { Agency, AgencySchema } from "./models/agency.entity";

@Module({
  imports: [MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }]), CoreModule],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
