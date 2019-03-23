import { Component, OnInit } from '@angular/core';
import { MessageDialogComponent } from 'src/app/_page/message-dialog/message-dialog.component';
import { ResponseData } from 'src/app/_model/response-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';
import { MatDialog } from '@angular/material';
import 'hammerjs';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {

  form: FormGroup;
  resForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['']
    });
    this.resForm = this.fb.group({
      employeeName: [{ value: '', disabled: true }],
      employeeAgeSlider: [{ value: '', disabled: true }],
      employeeMail: [{ value: '', disabled: true }]
    });
  }

  queryEmployee() {
    this.dataService.queryEmployee(this.form.get('name').value).subscribe((res: ResponseData) => {
      if (res.ResponseData.length > 0) {
        this.resForm.patchValue({
          employeeName: res.ResponseData[0].name,
          employeeAgeSlider: res.ResponseData[0].age,
          employeeMail: res.ResponseData[0].mail
        });
        this.resForm.get('employeeAgeSlider').enable();
        this.resForm.get('employeeMail').enable();
      } else {
        this.openDialog({ title: '失敗', message: '查詢結果為空' });
      }
    });
  }

  updateEmployee() {
    const emp = {
      name: this.resForm.get('employeeName').value,
      age: this.resForm.get('employeeAgeSlider').value,
      mail: this.resForm.get('employeeMail').value
    };

    this.dataService.updateEmployee(emp).subscribe((res: ResponseData) => {
      console.log(res);
      if (res.IsSuccess) {
        this.openDialog({ title: '成功', message: JSON.stringify(res.Message) });
      } else {
        this.openDialog({ title: '失敗', message: '更新失敗' });
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
