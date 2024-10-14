import { Schema, Document } from 'mongoose';

export const ChatSchema = new Schema({
  userId: { type: String, required: true },
  conversation: [
    {
      message: { type: String, required: true },
      sender: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export interface Chat extends Document {
  userId: string;
  conversation: {
    message: string;
    sender: string;
    timestamp: Date;
  }[];
}
