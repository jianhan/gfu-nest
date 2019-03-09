import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getJWTSecretKey(),
    });
  }

  async validate(payload: JwtPayload, done: Function) {
    // const user = await this.authService.validateUserByJwt(payload);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // return user;
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      // const validClaims = await this.authService.verifyTokenClaims(payload);

      // if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);
      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}
