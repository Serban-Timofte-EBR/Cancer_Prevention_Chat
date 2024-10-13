import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Register user
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save(); // This will return a UserDocument
  }

  // Validate user for login
  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    // Check the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
}
