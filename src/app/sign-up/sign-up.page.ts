import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService} from '../services/alert.service';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  register: FormGroup;
  submitted = false;
  loading = false;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private alert: AlertService,
      private device: Device
  ) {
    this.register = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      id_device: [this.device.uuid, Validators.required]
    });
  }

  get f() {
    return this.register.controls;
  }

  signup() {
    this.submitted = true;
    if (this.register.invalid) {
      return;
    }
    this.loading = true;
    const val = this.register.value;

    this.authService.register(this.register.value).subscribe(
        (res) => {
          this.router.navigate(['login']);
        },
        error => {
          this.alert.error(error);
          this.loading = false;
        }
    );
  }

  ngOnInit() {
  }

}
