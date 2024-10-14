import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chatbot-db'),
    AuthModule,
    UsersModule,
    ChatModule,
  ],
})
export class AppModule {}
