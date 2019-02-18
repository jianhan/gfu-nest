import { Provider } from '../../auth/providers';

export class CreateOauthUserDto {
  readonly imageUrl: string;
  readonly name: string;
  readonly email: string;
  readonly provider: Provider;
  readonly providerId: string;
  constructor(
    imageUrl: string,
    name: string,
    email: string,
    provider: Provider,
    providerId: string,
  ) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.email = email;
    this.provider = provider;
    this.providerId = providerId;
  }
}
