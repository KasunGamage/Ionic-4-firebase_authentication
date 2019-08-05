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

  logout(p: any): void {
    if (p.title === 'Logout') {
      this.firebaseAuth.logout();
    }
  }

  checkAuthState(): void {
    this.firebaseAuth.checkAuthState().subscribe((user: firebase.User) => {
      if (user) {
        console.log('The user is logged in!');
        this.navCtrl.navigateRoot('home');
      } else {
        console.log('The user is not logged in!');
        this.navCtrl.navigateRoot('login');
      }
    }, err => {
      this.toast.presentToastWithOptions(
        'checkAuthState Error',
        err.message,
        'bottom'
      );
      console.error(err);
    });
  }

}
