import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UtilsService } from "src/core/utils/utils.service";
import { AgencyDto } from "src/models/agency.dto";
import { Agency } from "./models/agency.entity";

@Injectable()
export class AgenciesService {
  constructor(
    private utilsService: UtilsService,
    @InjectModel(Agency.name) private readonly agenciesModel: Model<Agency>,
  ) {}

  public async selectAll(): Promise<Agency[]> {
    return await this.agenciesModel.find();
  }

  public async findById(id: string): Promise<Agency> {
    return await this.agenciesModel.findById(id);
  }

  public async insert(agencyDto: AgencyDto): Promise<Agency> {
    const newAgency: Agency = await this.agenciesModel.create({ ...agencyDto, id: "123" });
    await newAgency.save();
    return newAgency;
  }
}
