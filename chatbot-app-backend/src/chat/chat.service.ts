import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from './chat.schema';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Process the user's message and interact with OpenAI API
  async processMessage(createMessageDto: CreateMessageDto): Promise<any> {
    const { message, userId } = createMessageDto;

    // Fetch the user's previous conversation history from MongoDB
    let chat = await this.chatModel.findOne({ userId });

    if (!chat) {
      // If no previous history exists, create a new conversation document
      chat = new this.chatModel({
        userId,
        conversation: [],
      });
    }

    // Add the user's message to the conversation history
    chat.conversation.push({ message, sender: 'user', timestamp: new Date() });

    // Create the context from the conversation history
    const context = chat.conversation
      .map(
        (entry) =>
          `${entry.sender === 'user' ? 'User' : 'Bot'}: ${entry.message}`,
      )
      .join('\n');

    // Fetch bot response using OpenAI API
    const botResponse = await this.getOpenAIResponse(context);

    // Add the bot's response to the conversation history
    chat.conversation.push({
      message: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    });

    // Save the updated conversation history to MongoDB
    await chat.save();

    return { userId, message, botResponse };
  }

  // OpenAI API call
  private async getOpenAIResponse(context: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful medical assistant chatbot.',
          },
          { role: 'user', content: context },
        ],
        max_tokens: 150,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
      return 'Sorry, something went wrong with the chatbot.';
    }
  }

  // Method to retrieve the chat history for a given user
  async getChatHistory(
    userId: string,
  ): Promise<{ message: string; sender: string; timestamp: Date }[]> {
    const chat = await this.chatModel.findOne({ userId });
    if (!chat) {
      return [];
    }
    return chat.conversation;
  }
}
