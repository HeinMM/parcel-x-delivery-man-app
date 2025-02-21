import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([ tokenInterceptorInterceptor])
  )],
};

