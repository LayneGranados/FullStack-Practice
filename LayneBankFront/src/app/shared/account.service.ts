import { Injectable } from '@angular/core';
import { Account } from './account.model';
import { HttpClient } from "@angular/common/http";
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  formData  : Account;
  owner  : Client;
  list : Account[];
  readonly rootURL ="http://localhost:8083/clients/";

  constructor(private http : HttpClient) { }

  postAccount(formData : Account){
   return this.http.post(this.rootURL+this.owner.clientId+'/accounts/',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+this.owner.clientId+'/accounts')
    .toPromise().then(res => this.list = res as Account[]);
  }

  putAccount(formData : Account){
    return this.http.put(this.rootURL+this.owner.clientId+'/accounts/'+formData.accountId,formData);
   }

   deleteAccount(accountId : number, clientId : number){
     return this.http.delete(this.rootURL+this.owner.clientId+'/accounts/'+accountId);
    }
}