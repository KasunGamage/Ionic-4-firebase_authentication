import { Component, OnInit } from '@angular/core';
import { UserRequest } from '../../models/requests/user-request';
import { FirebaseAuthService } from '../../services/auth/firebase-auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {
  user: UserRequest = new UserRequest();

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });


  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(){
    this.firebaseAuth.register(this.registerForm.value);
  }

}
