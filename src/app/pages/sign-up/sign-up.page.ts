import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRequest } from '../../models/requests/user-request';
import { FirebaseAuthService } from '../../services/auth/firebase-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit, OnDestroy {
  user: UserRequest = new UserRequest();

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private menuController: MenuController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  async onSubmit() {
    try {
      const success = await this.firebaseAuth.register(this.registerForm.value);
      if (success) {
        this.navCtrl.navigateRoot('home');
      }
    } catch (error) {
      throw error;
    }
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  ngOnDestroy() {}
}
