import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;


  constructor(private authService: AuthService,
              private router: Router,
              private alert: AlertService,
              private fb: FormBuilder) {
      this.form = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });
  }
    get f() {
        return this.form.controls;
    }
  login() {
    this.submitted = true;
    const val = this.form.value;
    console.log(val);
    if (val.email && val.password ) {
        console.log('ok');
        this.loading = true;
        this.authService.login(this.form.value)
          .subscribe(
              (res) => {
                console.log(res);
                console.log('User is logged in');
                this.router.navigateByUrl('tab1');
              },
              error => {
                this.alert.error(error);
                this.loading = false;
              }
          );
    } else {
        console.log('Error');
    }
  }

   ngOnInit() {
    }

}
