import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;

  loginData = {
    userNameOrEmail: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = formBuilder.group({
      userNameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.loginData);
  }

}

function matchingFields (field1, field2) {
  return form => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return { mismatchedFields: true };
    }
  };
}
