import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import {AppState} from '../../reducers';
import {Login} from '../auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          email: ['test_user@avnos.io', [Validators.required]],
          password: ['password123', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;

    this.auth.login(val.email, val.password)
      .pipe(
        tap(user => {

          this.store.dispatch(new Login({user}));

          this.router.navigateByUrl('/users');

        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      );


  }


}