import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  gender: string;

  @Prop()
  smoker: boolean;

  @Prop()
  region: string; // E.g., Vrancea, București

  @Prop()
  ageInterval: string; // E.g., "< 20", "21 - 30"

  @Prop()
  medicalCondition: string; // E.g., Cardiovascular incident
}

export const UserSchema = SchemaFactory.createForClass(User);
