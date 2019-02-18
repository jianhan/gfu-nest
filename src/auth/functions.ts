import { Provider } from './providers';

export const getThirdPartyCallbackUrl = (provider: Provider): string => {
  return `${process.env.HOMEPAGE_URL}auth/${provider}/callback`;
};
