import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here// Import HttpClientModule to make HTTP services available

import { AppComponent } from './app.component';
import { CreaturesComponent } from './creatures/creatures.component';
import { CreatureDetailComponent } from './creature-detail/creature-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { CreatureSearchComponent } from './creature-search/creature-search.component';
// Import other components or modules if necessary

@NgModule({
  declarations: [
    AppComponent,
    CreaturesComponent,
    CreatureDetailComponent,
    MessagesComponent,
    DashboardComponent,
    CreatureSearchComponent,
    // List other components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule // Add HttpClientModule here to make HttpClient available
    // Add other modules here
  ],
  providers: [
    // Since CreatureService has providedIn: 'root', it does not need to be listed here
  ],
  bootstrap: [AppComponent] // This should be your root component
})
export class AppModule { }
