import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../_service/data.service';
import { ResponseData } from 'src/app/_model/response-data';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('basicDialog')
  basicDialog: ModalDirective;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    this.dataService.
      login(this.form.get('username').value, this.form.get('password').value).
      subscribe((res: ResponseData) => {
        console.log(res);

        if (res.IsSuccess === true && res.ResponseData > 0) {
          sessionStorage.setItem('username', this.form.get('username').value);
          this.router.navigateByUrl('material');
        } else {
          this.basicDialog.show();
        }
      });
  }

}
