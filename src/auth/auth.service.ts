import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { OAuth2Client } from 'google-auth-library';
import { sign } from 'jsonwebtoken';
import { User } from '../users/user.interface';
import { CreateOauthUserDto } from '../users/dto/create-oauth-user.dto';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY';
  private _oauth2Client: OAuth2Client;

  constructor(private readonly usersService: UsersService) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    // This will be used for the initial login
    const userToAttempt = await this.usersService.findOneByEmail(
      loginAttempt.email,
    );

    return new Promise(resolve => {
      // Check the supplied password against the hash stored for this email address
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
        if (err) {
          throw new UnauthorizedException();
        }

        if (isMatch) {
          // If there is a successful match, generate a JWT for the user
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          throw new UnauthorizedException();
        }
      });
    });
  }

  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateOAuthLogin(
    createOauthUserDto: CreateOauthUserDto,
  ): Promise<string> {
    try {
      let user: User = await this.usersService.findOneByProviderAndId(
        createOauthUserDto.provider,
        createOauthUserDto.providerId,
      );

      if (!user) {
        user = await this.usersService.createOauthUser(createOauthUserDto);
      }
      console.log(user, '------');
      const payload = {
        provider: createOauthUserDto.provider,
        providerId: createOauthUserDto.providerId,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = sign(data, this.JWT_SECRET_KEY, { expiresIn: 3600 });

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }

  async getToken(code: string): Promise<GetTokenResponse> {
    return await this._oauth2Client.getToken(code);
  }
}
