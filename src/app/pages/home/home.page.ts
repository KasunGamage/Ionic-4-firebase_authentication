import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/auth/firebase-auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: firebase.User;

  constructor(private fbAuth: FirebaseAuthService) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.user = this.fbAuth.getAuthInfo();
  }

}
