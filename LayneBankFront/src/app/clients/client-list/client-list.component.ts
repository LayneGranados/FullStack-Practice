import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { AccountService } from 'src/app/shared/account.service';
import { Client } from 'src/app/shared/client.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private clientService: ClientService,
              private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.clientService.refreshList();
  }

  populateForm(cli: Client) {
    console.log('cli: '+cli.clientId);
    this.clientService.formData = Object.assign({}, cli);
    this.accountService.owner =  Object.assign({}, cli);
    this.accountService.refreshList();
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.clientService.deleteClient(id).subscribe(res => {
        this.clientService.refreshList();
        this.toastr.warning('Deleted successfully', 'Layne Bank');
      });
    }
  }

}
