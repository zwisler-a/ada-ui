import {AuthConfig} from 'angular-oauth2-oidc';
import {OpenAPI} from "../auth-api";

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: OpenAPI.BASE,
  requireHttps: false,
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'ada',
  responseType: 'code',
  scope: 'openid profile email offline_access api',

  showDebugInformation: true,
};
