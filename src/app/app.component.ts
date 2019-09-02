import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseAuthService } from './services/auth/firebase-auth.service';
import { ToastService } from './services/utilities/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'power'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAuth: FirebaseAuthService,
    private navCtrl: NavController,
    private toast: ToastService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkAuthState();
    });
  }

  async logout(p: any) {
    if (p.title === 'Logout') {
      try {
        await this.firebaseAuth.logout();
      } catch (error) {
        throw error;
      }
    }
  }

  checkAuthState(): void {
    this.firebaseAuth.checkAuthState().subscribe(
      (user: firebase.User) => {
        if (user) {
          this.navCtrl.navigateRoot('home');
        } else {
          this.navCtrl.navigateRoot('login');
        }
      },
      err => {
        this.toast.presentToastWithOptions(
          'checkAuthState Error',
          err.message,
          'bottom'
        );
      }
    );
  }
}
