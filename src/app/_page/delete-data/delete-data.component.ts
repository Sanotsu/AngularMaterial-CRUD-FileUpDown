import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/_model/response-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-data',
  templateUrl: './delete-data.component.html',
  styleUrls: ['./delete-data.component.scss']
})
export class DeleteDataComponent implements OnInit {

  form: FormGroup;
  resForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['']
    });
    this.resForm = this.fb.group({
      employeeName: [''],
      employeeAge: [''],
      employeeMail: ['']
    });

  }

  queryEmployee() {
    this.dataService.queryEmployee(this.form.get('name').value).subscribe((res: ResponseData) => {
      if (res.ResponseData.length > 0) {
        this.resForm.patchValue({
          employeeName: res.ResponseData[0].name,
          employeeAge: res.ResponseData[0].age,
          employeeMail: res.ResponseData[0].mail
        });
      } else {
        this.snackBar.open('查詢結果為空', '確認', {
          duration: 3000
        });
      }
    });
  }

  deleteEmployee() {
    const emp = {
      name: this.resForm.get('employeeName').value,
      age: this.resForm.get('employeeAge').value,
      mail: this.resForm.get('employeeMail').value
    };
    this.dataService.deleteEmployee(emp).subscribe((res: ResponseData) => {
      if (res.IsSuccess) {
        const snackBarRef = this.snackBar.open('刪除資料成功', '確認', {
          duration: 3000
        });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log('The snack-bar was dismissed');
        });
        snackBarRef.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });
        this.resForm.reset();
        this.form.reset();
      } else {
        this.snackBar.open('刪除資料失敗', '確認');
      }
    });
  }
}
