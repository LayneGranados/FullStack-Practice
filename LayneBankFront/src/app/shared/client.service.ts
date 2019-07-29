import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  formData  : Client;
  list : Client[];
  readonly rootURL ="http://localhost:8083/"

  constructor(private http : HttpClient) { }

  postClient(formData : Client){
   return this.http.post(this.rootURL+'clients',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'clients')
    .toPromise().then(res => this.list = res as Client[]);
  }

  putClient(formData : Client){
    return this.http.put(this.rootURL+'clients/',formData); 
   }

   deleteClient(id : number){
     console.log('id al eliminar: '+id);
    return this.http.delete(this.rootURL+'clients/'+id);
   }
}
