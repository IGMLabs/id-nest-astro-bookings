import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Client } from "./client.interface";
import { PositiveNumberPipe } from "./core/pipes/positive-number.pipe";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  public getTest(): string {
    return "Hola Test";
  }

  @Post("")
  public postHello(@Body() name: string): string {
    const type = typeof name;
    const nameString = JSON.stringify(name);
    return `Body ${name} of type ${type}; ${nameString}`;
  }

  @Post("name")
  public postHelloName(@Body() payload: { name: string }): string {
    return `Hello ${payload.name}`;
  }

  @Get("/param/:id")
  public getParam(@Param("id") id: string): string {
    const type = typeof id;

    return `Param: ${id} of type ${type}`;
  }

  @Get("/square/:someParam")
  public getSquare(@Param("someParam") someParam: number): string {
    const type = typeof someParam;
    const square = someParam * someParam;
    return `Square of ${someParam} of type ${type} is ${square}`;
  }

  @Get("/square/nan/:someParam")
  public getSquareNan(@Param("someParam") someParam: number): string {
    const someNumber = parseInt(someParam.toString());
    if (isNaN(someNumber)) throw new HttpException(`${someParam} is not a number`, HttpStatus.BAD_REQUEST);
    const type = typeof someParam;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/square/pipe/:someParam")
  public getSquarePipe(@Param("someParam", ParseIntPipe) someNumber: number): string {
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/multiply/:someParam/:otherParam")
  public getMultiply(
    @Param("someParam", ParseIntPipe) someNumber: number,
    @Param("otherParam", ParseIntPipe) otherNumber: number,
  ): string {
    const multiply = someNumber * otherNumber;
    return `Multiplication of ${someNumber} by ${otherNumber} is ${multiply}`;
  }

  @Get("/multiply/query")
  public getMultiplyQuery(
    @Query("a", ParseIntPipe) someNumber: number,
    @Query("b", ParseIntPipe) otherNumber: number,
  ): number {
    return this.appService.multiply(someNumber, otherNumber);
  }

  @Get("/divide/query")
  public getDivideQuery(
    @Query("a", ParseIntPipe) someNumber: number,
    @Query("b", ParseIntPipe) otherNumber: number,
  ): number {
    if (otherNumber === 0) {
      throw new HttpException(`${otherNumber} is 0`, HttpStatus.BAD_REQUEST);
    } else {
      return this.appService.divide(someNumber, otherNumber);
    }
  }

  // @Get("/squareroot/query")
  // public getQuery(@Query("a", ParseIntPipe) someNumber: number): number {
  //   if (someNumber < 1) {
  //     throw new HttpException(`${someNumber} is less than 1`, HttpStatus.BAD_REQUEST);
  //   } else {
  //     return this.appService.squareroot(someNumber);
  //   }
  // }

  @Get("/squareroot/query")
  public getQuery(@Query("a", ParseIntPipe) someNumber: number): number {
    if (someNumber < 0) {
      throw new HttpException(`${someNumber} is less than 0`, HttpStatus.BAD_REQUEST);
    } else {
      return this.appService.squareroot(someNumber);
    }
  }

  @Get("/squareroot/pipe/query")
  public getSRQuery(@Query("a", PositiveNumberPipe) someNumber: number): number {
    return this.appService.squareroot(someNumber);
  }

  @Post("client")
  public postClient(@Body() payload: Client): Client {
    return this.appService.saveClient(payload);
  }

  @Put("client/:id")
  public putClient(@Param("id") clientId: string, @Body() payload: Client): Client {
    try {
      return this.appService.updateClient(clientId, payload);
    } catch (error) {
      const message: string = error.message;
      if (message.startsWith("Not found: ")) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
