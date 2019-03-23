import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/_model/response-data';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-multiple-query',
  templateUrl: './multiple-query.component.html',
  styleUrls: ['./multiple-query.component.scss']
})
export class MultipleQueryComponent implements OnInit {

  dataSource: ResponseData[];
  spDataSource: ResponseData[];
  tableVisible: boolean;
  sptableVisible: boolean;
  displayedColumns: string[] = ['name', 'age'];
  form: FormGroup;
  spform: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['']
    });
    this.spform = this.fb.group({
      empsex: [''],
      empage: ['']
    });
  }

  queryEmployee() {
    this.dataService.queryEmployee(this.form.get('name').value).subscribe((res: ResponseData) => {
      this.tableVisible = true;
      this.dataSource = res.ResponseData;
      console.log(this.dataSource);
    });
  }

  queryEmployeeBySp() {
    this.dataService.queryEmployeeBySp(this.spform.get('empsex').value, this.spform.get('empage').value).subscribe((res: ResponseData) => {
      this.sptableVisible = true;

      console.log(res);

      this.spDataSource = res.ResponseData[0];
    });
  }

}
