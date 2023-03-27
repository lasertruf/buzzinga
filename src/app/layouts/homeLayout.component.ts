import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: '<router-outlet></router-outlet>' })
export class HomeLayoutComponent implements OnInit {

  constructor(private router: Router) {

    // router.navigate(['home'])
   }

  ngOnInit(): void {
  }

}
