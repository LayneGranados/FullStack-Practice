import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { AccountComponent } from './clients/account/account.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { AccountListComponent } from './clients/account-list/account-list.component';
import { ClientService } from './shared/client.service';
import { AccountService } from './shared/account.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientComponent,
    ClientListComponent,
    AccountComponent,
    AccountListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ClientService,AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
