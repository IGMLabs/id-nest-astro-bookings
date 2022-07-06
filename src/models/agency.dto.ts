import { IsNotEmpty, IsString } from "class-validator";

export class AgencyDto {
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  range: string;

  @IsString()
  status: string;
}
