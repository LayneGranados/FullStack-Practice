import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private service: AccountService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      clientId: null,
      accountId: null,
      name: '',
      number: ''
    }
  }

  onSubmit(form: NgForm) {
    console.log('accountId component: '+form.value.accountId);
    console.log('name component: '+form.value.name);
    console.log('number component: '+form.value.number);
    console.log('clientId component: '+form.value.clientId);
    if (form.value.accountId == null) {
      console.log('to save account');
      this.insertRecord(form);
    }
    else {
      console.log('to update account');
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postAccount(form.value).subscribe(res => {
      this.toastr.success('Inserted Account successfully', 'Layne Bank');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putAccount(form.value).subscribe(res => {
      this.toastr.info('Updated Account successfully', 'Layne Bank');
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
