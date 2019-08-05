import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/auth/firebase-auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;

  constructor(private fbAuth: FirebaseAuthService) {}

  ngOnInit() {
    this.user = this.fbAuth.getAuthInfo();
    console.log(this.user);
  }

}
