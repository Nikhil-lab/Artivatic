import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let API_KEY=environment.apiKey;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


let myScript = document.createElement("script");
myScript.setAttribute("src", "http://maps.googleapis.com/maps/api/js?key="+API_KEY);
document.body.appendChild(myScript);