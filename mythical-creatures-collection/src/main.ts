// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// import { enableProdMode } from '@angular/core';
// import { AppComponent } from './app/app.component'; 

// enableProdMode(); // Enable production mode

// platformBrowserDynamic().bootstrapModule(AppComponent) // Bootstrap the standalone AppComponent
//   .catch(err => console.error(err));
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

