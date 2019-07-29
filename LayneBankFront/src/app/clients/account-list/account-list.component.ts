import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { Account } from 'src/app/shared/account.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(private service: AccountService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(act: Account) {
    console.log('act: '+act.accountId);
    this.service.formData = Object.assign({}, act);
  }

  onDelete(accountId : number, clientId : number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteAccount(accountId, clientId).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Layne Bank');
      });
    }
  }

}
