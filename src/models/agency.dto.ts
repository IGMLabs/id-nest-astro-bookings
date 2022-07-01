import { IsNotEmpty, IsString } from "class-validator";

export class AgencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
