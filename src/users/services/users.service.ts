import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOauthUserDto } from '../dto/create-oauth-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult, ObjectID } from 'typeorm';
import { CreateRegisteredUserDto } from '../dto/create-registered-user.dto';
import { Provider } from '../entities/provider.entity';

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

  async findOneByProviderAndId(provider: Provider): Model<User> {
    return await this.userRepository.findOne({
      where: { provider: { id: provider.id, name: provider.name } },
    });
  }

  async createOauthUser(dto: CreateOauthUserDto): Model<User> {
    const { provider, providerId, ...u } = dto;
    const user = Object.assign(new User(), u, {
      provider: { id: dto.providerId, name: dto.provider },
    });

    return await this.userRepository.insert(user);
  }

  async updateOauthUser(
    id: ObjectID,
    dto: CreateOauthUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update(
      id,
      Object.assign(new User(), dto, {
        provider: { id: dto.providerId, name: dto.provider },
      }),
    );
  }
}
