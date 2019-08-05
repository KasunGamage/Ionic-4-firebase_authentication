import { Component, OnInit } from '@angular/core';
import { UserRequest } from '../../models/requests/user-request';
import { FirebaseAuthService } from '../../services/auth/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {
  user: UserRequest = new UserRequest();

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  register(): void {
    this.firebaseAuth.register(this.user);
  }

  login() {
    this.router.navigate(['login']);
  }
}
