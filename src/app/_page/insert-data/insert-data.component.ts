import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageDialogComponent } from 'src/app/_page/message-dialog/message-dialog.component';
import { ResponseData } from 'src/app/_model/response-data';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';
import { MatDialog, MatStep } from '@angular/material';

@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.scss']
})
export class InsertDataComponent implements OnInit {

  isLinear = true;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  @ViewChild('stepper')
  stepper: MatStep;

  constructor(private fb: FormBuilder, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.firstForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.secondForm = this.fb.group({
      age: ['', Validators.required],
      sex: ['', Validators.required],
      empDate: ['', Validators.required]
    });
    this.thirdForm = this.fb.group({
      mail: ['', Validators.required]
    });
  }

  insertData() {
    const employee = {
      'name': this.firstForm.get('name').value,
      'age': this.secondForm.get('age').value,
      'sex': this.secondForm.get('sex').value,
      'empDate': this.secondForm.get('empDate').value,
      'mail': this.thirdForm.get('mail').value
    };
    this.dataService.insertEmployee(employee).subscribe((res: ResponseData) => {
      if (res.IsSuccess) {
        this.openDialog({ title: '成功', message: JSON.stringify(res.Message) });
        this.stepper.reset();
      } else {
        this.openDialog({ title: '失敗', message: JSON.stringify(res.Message) });
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
