import { Injectable } from "@nestjs/common";
import { Client } from "./client.interface";

@Injectable()
export class AppService {
  public getHello(): string {
    return "Hello World!";
  }
  public multiply(someNumber: number, otherNumber: number): number {
    const multiply = someNumber * otherNumber;
    return multiply;
  }
  public divide(someNumber: number, otherNumber: number): number {
    const multiply = someNumber / otherNumber;
    return multiply;
  }
  public squareroot(someNumber: number): number {
    const multiply = Math.sqrt(someNumber);
    return multiply;
  }

  public saveClient(client: Client) {
    client.id = Math.random().toString();
    return client;
  }

  public updateClient(clientId: string, client: Client) {
    if (clientId != "") {
      throw new Error("Not found: " + clientId);
    }
    return client;
  }
}
