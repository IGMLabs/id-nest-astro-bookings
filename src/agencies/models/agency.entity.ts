import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "agencies", timestamps: true })
export class Agency extends Document {
  @Prop({ required: false })
  public name: string;

  @Prop({ required: false })
  public range: string;

  @Prop({ required: false })
  public status: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
