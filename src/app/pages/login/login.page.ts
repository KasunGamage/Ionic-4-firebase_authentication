import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/auth/firebase-auth.service';
import { UserRequest } from '../../models/requests/user-request';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user: UserRequest;

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.user = new UserRequest();
  }

  login(): void {
    this.firebaseAuth.login(this.user);
  }

  routeToRegister() {
    this.router.navigate(['sign-up']);
  }

  changePassword() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      inputs: [
        {
          name: this.user.email,
          type: 'email',
          placeholder: 'Type email here'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Send link',
          handler: () => {
            console.log('Confirm Ok');
            this.firebaseAuth.changePassword(this.user.email);
          }
        }
      ]
    });

    await alert.present();
  }
}
