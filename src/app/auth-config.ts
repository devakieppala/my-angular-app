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
export const clientId = '5d247c1a-7bbb-4c86-8d34-6c945a681a6d';
export const apiBaseUrl = environment.apiUrl;
export const apiScope =
  'api://57aff473-24d7-40d3-8ed0-4ac35051d519/access_as_user';

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