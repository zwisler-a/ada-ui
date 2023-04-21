import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {OpenAPI as CoreOpenApi} from "./api";
import {OpenAPI as AuthOpenApi} from "./auth-api";
import {authCodeFlowConfig} from "./app/auth.config";

function prepareUrl(url: string) {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}

(async () => {
  const config = await fetch('config.json').then(res => res.json());
  CoreOpenApi.BASE = prepareUrl(config.CORE_URL);
  AuthOpenApi.BASE = prepareUrl(config.AUTH_URL);
  authCodeFlowConfig.issuer = config.AUTH_URL;
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

})()
