import { Provider } from '../../auth/providers';

export class CreateOauthUserDto {
  readonly avatarUrl: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly provider: Provider;
  readonly providerId: string;
  constructor(
    avatarUrl: string,
    firstName: string,
    lastName: string,
    email: string,
    provider: Provider,
    providerId: string,
  ) {
    this.avatarUrl = avatarUrl;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.provider = provider;
    this.providerId = providerId;
  }

  extract() {
    const { provider, providerId, ...u } = this;
    return {
      u,
      provider,
      providerId,
    };
  }
}
