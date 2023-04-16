import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {OpenAPI as CoreOpenApi} from "./api";
import {OpenAPI as AuthOpenApi} from "./auth-api";
import {authCodeFlowConfig} from "./app/auth.config";

(async () => {
  const config = await fetch('config.json').then(res => res.json());
  CoreOpenApi.BASE = config.CORE_URL;
  AuthOpenApi.BASE = config.AUTH_URL;
  authCodeFlowConfig.issuer = config.AUTH_URL;
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

})()
