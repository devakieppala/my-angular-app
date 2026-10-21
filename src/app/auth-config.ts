import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication
} from '@azure/msal-browser';

import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import { environment } from '../environments/environment';

export const tenantId = 'a08e3176-d24d-43aa-9918-ebb9099146ba';
export const clientId = 'a65f6535-9b24-4d82-b664-bd3c0bc208df';
export const apiBaseUrl = environment.apiUrl;
export const apiScope =
  'api://b93fe8b6-fea0-4d0c-b525-53d416cca37e/access_as_user';

export function msalInstanceFactory():
  IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId,
      authority:
        `https://login.microsoftonline.com/${tenantId}`,
      redirectUri: environment.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage
    }
  });
}

export function msalGuardConfigFactory():
  MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [apiScope]
    }
  };
}

export function msalInterceptorConfigFactory():
  MsalInterceptorConfiguration {
  const protectedResourceMap =
    new Map<string, string[] | null>();

    console.log(apiBaseUrl);

  protectedResourceMap.set(
    `${apiBaseUrl}/*`,
    [apiScope]
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}