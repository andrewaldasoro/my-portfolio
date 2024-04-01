/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import pjson from '../package.json';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

console.log(`Version: ${pjson.version}`);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
