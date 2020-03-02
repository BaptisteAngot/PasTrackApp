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
  private errorcheck: void;
  private connectionResult: void;


  constructor(private authService: AuthService,
              private router: Router,
              private alert: AlertService,
              private fb: FormBuilder,
              ) {
      this.form = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });
  }
    get f() {
        return this.form.controls;
    }

    async login() {
        this.submitted = true;
        const val = this.form.value;
        if (val.email && val.password) {
            this.loading = true;
            this.connectionResult = await this.authService.login(this.form.value);
            console.log(this.connectionResult);
        }
    }

   ngOnInit() {
    }
}
