import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Provider } from '../../auth/providers';
import { CreateOauthUserDto } from '../dto/create-oauth-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRegisteredUserDto } from '../dto/create-registered-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createRegisteredUser(user: CreateRegisteredUserDto): Model<User> {
    return this.userRepository.create(user);
  }

  async findOneByEmail(email): Model<User> {
    return await this.userRepository.findOne({ email });
  }

  async findOneByProviderAndId(
    provider: Provider,
    providerId: string,
  ): Model<User> {
    return await this.userRepository.findOne({
      where: { provider: { id: providerId, name: provider } },
    });
  }

  createOauthUser(dto: CreateOauthUserDto): Model<User> {
    const user = Object.assign(new User(), dto, {
      provider: { id: dto.providerId, name: dto.provider },
    });

    return this.userRepository.create(user);
  }
}
