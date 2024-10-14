import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.chatService.processMessage(createMessageDto);
  }

  // Public route to get chat history - to be modified later
  @Get('history')
  async getChatHistory(@Request() req) {
    const userId = req.query.userId;
    return this.chatService.getChatHistory(userId);
  }
}
