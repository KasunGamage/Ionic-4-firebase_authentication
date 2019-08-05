import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserRequest } from '../../models/requests/user-request';
import { NavController } from '@ionic/angular';
import { ToastService } from '../utilities/toast.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(
    private fAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toast: ToastService
  ) {}

  async login(user: UserRequest): Promise<void> {
    try {
      const r = await this.fAuth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      if (r) {
        // login success
        this.navCtrl.navigateRoot('home');
      }
    } catch (err) {
      console.error(err);
      this.toast.presentToastWithOptions('Login Error', err.message, 'bottom');
    }
  }

  async register(user: UserRequest): Promise<void> {
    try {
      const r = await this.fAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (r) {
        // registered success
        this.navCtrl.navigateRoot('home');
      }
    } catch (err) {
      this.toast.presentToastWithOptions(
        'Register Error',
        err.message,
        'bottom'
      );
      console.error(err);
    }
  }

  logout(): void {
    try {
      this.fAuth.auth.signOut();
    } catch (err) {
      this.toast.presentToastWithOptions(
        'signOut Error',
        err.message,
        'bottom'
      );
      console.error(err);
    }
  }

  checkAuthState(): Observable<firebase.User> {
    return this.fAuth.authState;
  }

  changePassword(email): void {
    try {
      this.fAuth.auth.sendPasswordResetEmail(email);
    } catch (err) {
      this.toast.presentToastWithOptions(
        'sendPasswordResetEmail Error',
        err.message,
        'bottom'
      );
      console.error(err);
    }
  }

  getAuthInfo(): firebase.User {
    return this.fAuth.auth.currentUser;
  }
}
