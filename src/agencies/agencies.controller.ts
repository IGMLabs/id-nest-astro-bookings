import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AgencyDto } from "src/models/agency.dto";
import { AgenciesService } from "./agencies.service";
import { ApiKeyGuard } from "./api-key.guard";
import { Agency } from "./models/agency.entity";

@Controller("agencies")
@UseGuards(ApiKeyGuard)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

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
