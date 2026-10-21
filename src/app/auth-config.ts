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
export const clientId = '9e28a7bc-c335-472f-aad2-32a4b9299e9a';
export const apiBaseUrl = environment.apiUrl;
export const apiScope =
  'api://1ceeff02-f3cd-4d2f-a073-e25c5377f934/access_as_user';

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