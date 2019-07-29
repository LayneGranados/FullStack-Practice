import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private service: ClientService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      clientId: null,
      fullName: '',
      identification: '',
      address: '',
      telephone: ''
    }
  }


  onSubmit(form: NgForm) {
    console.log('client component: '+form.value.clientId);
    if (form.value.clientId == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postClient(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Layne Bank');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putClient(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Layne Bank');
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
