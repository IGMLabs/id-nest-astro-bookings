import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateAgencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  age?: number;
}
