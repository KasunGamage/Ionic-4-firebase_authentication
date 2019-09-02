import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/auth/firebase-auth.service';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController,
    private navCtrl: NavController,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.menuController.enable(false);
  }

  routeToRegister() {
    this.router.navigate(['sign-up']);
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      inputs: [
        {
          name: 'email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Send link',
          handler: (res: any) => {
            this.changePassword(res);
          }
        }
      ]
    });

    await alert.present();
  }

  async onSubmit() {
    try {
      const success = await this.firebaseAuth.login(this.loginForm.value);
      if (success) {
        this.toast.presentToastWithOptions(
          'Success',
          'Login Success!',
          'bottom'
        );
        this.navCtrl.navigateRoot('home');
      }
    } catch (error) {
      // throw to global handler
      throw error;
    }
  }

  async changePassword(res) {
    try {
      await this.firebaseAuth.changePassword(res.email);
    } catch (error) {
      throw error;
    }
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }
}
