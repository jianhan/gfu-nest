import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { Provider } from '../auth/providers';
import { CreateOauthUserDto } from './dto/create-oauth-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email): Model<User> {
    return await this.userModel.findOne({ email });
  }

  async findOneByProviderAndId(
    provider: Provider,
    providerId: string,
  ): Model<User> {
    return await this.userModel.findOne({
      provider,
      providerId,
    });
  }

  async createOauthUser(dto: CreateOauthUserDto): Model<User> {
    return await this.userModel.create(dto);
  }
}
