import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';
import { MatDialog } from '@angular/material';
import { ResponseData } from 'src/app/_model/response-data';
import { MessageDialogComponent } from 'src/app/_page/message-dialog/message-dialog.component';

@Component({
  selector: 'app-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.scss']
})
export class SingleQueryComponent implements OnInit {

  form: FormGroup;
  resForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['']
    });
    this.resForm = this.fb.group({
      employeeName: [{ value: '', disabled: true }],
      employeeAge: [{ value: '', disabled: true }]
    });
  }

  queryEmployee() {
    this.dataService.queryEmployee(this.form.get('name').value).subscribe((res: ResponseData) => {
      if (res.ResponseData.length > 0) {
        this.resForm.patchValue({
          employeeName: res.ResponseData[0].name,
          employeeAge: res.ResponseData[0].age
        });
      } else {
        this.openDialog({ title: '失敗', message: '查詢結果為空' });
      }
    });
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { title: data.title, message: data.message }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
