import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isOnline: false
    }, { validator: matchingPassword('password', 'confirmPassword')});
  }

  ngOnInit() {
  }

  createUser() {
    if (this.form.valid) {
      this.auth.register(this.form.value);
      this.form.reset();
    }
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }

}

function matchingPassword (field1, field2) {
  return form => {
    if (form.controls[field1].value !== form.controls[field2].value && !form.controls[field2].invalid) {
      return { mismatchedFields: true };
    }
  };
}
