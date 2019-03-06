import { Provider } from './providers';

export const getThirdPartyCallbackUrl = (
  homepageUrl: string,
  provider: Provider,
): string => {
  return `${homepageUrl}auth/${provider}/callback`;
};
