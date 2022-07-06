import { Body, Controller, Get, Options, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { application, response } from "express";
import { MongodbErrorFilter } from "src/core/filters/mongodb-error.filter";
import { AgencyDto } from "src/models/agency.dto";
import { AgenciesModule } from "./agencies.module";
import { AgenciesService } from "./agencies.service";
import { ApiKeyGuard } from "./api-key.guard";
import { Agency } from "./models/agency.entity";

@Controller("agencies")
@UseFilters(MongodbErrorFilter)
//@UseGuards(ApiKeyGuard)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // @Options()
  // async allOk() {
  //   // const app = await NestFactory.create(AgenciesModule);
  //   // app.enableCors();
  //   response.status(200).send("allOk");
  // }

  @Get()
  async getAll(): Promise<Agency[]> {
    return await this.agenciesService.selectAll();
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    return await this.agenciesService.findById(id);
  }

  @Post()
  public async postAgency(
    @Body()
    agency: AgencyDto,
  ): Promise<Agency> {
    return await this.agenciesService.insert(agency);
  }
}
