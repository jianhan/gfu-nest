import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { getThirdPartyCallbackUrl } from '../functions';
import { Provider } from '../providers';
import { CreateOauthUserDto } from '../../users/dto/create-oauth-user.dto';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.getOauthGoogleClientId(),
      clientSecret: configService.getOauthGoogleClientSecret(),
      callbackURL: getThirdPartyCallbackUrl(
        configService.getHomePageUrl(),
        Provider.GOOGLE,
      ),
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done,
  ) {
    try {
      console.log(profile);
      const createOauthUserDto: CreateOauthUserDto = new CreateOauthUserDto(
        profile.photos[0].value,
        profile.displayName,
        profile.displayName,
        profile.emails[0].value,
        Provider.GOOGLE,
        profile.id,
      );
      const jwt: string = await this.authService.validateOAuthLogin(
        createOauthUserDto,
      );
      const user = {
        jwt,
      };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }

  private getThirdPartyCallbackUrl = (provider: Provider): string => {
    return `${process.env.HOMEPAGE_URL}auth/${provider}/callback`;
  };
}
