import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  username = sessionStorage.getItem('username');
  constructor(private router: Router) { }

  logout() {
    sessionStorage.removeItem('username');
    this.router.navigateByUrl('login');
  }

}
