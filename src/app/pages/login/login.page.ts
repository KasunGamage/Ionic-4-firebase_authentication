import { Component, OnInit, OnDestroy } from "@angular/core";
import { FirebaseAuthService } from "src/app/services/auth/firebase-auth.service";
import { Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController
  ) {
    this.menuController.enable(false);
  }

  ngOnInit() {
  }

  // ionViewDidEnter() {
  //   this.menuController.enable(false);
  // }

  routeToRegister() {
    this.router.navigate(["sign-up"]);
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: "Reset Password",
      inputs: [
        {
          name: 'email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
          }
        },
        {
          text: "Send link",
          handler: (res: any) => {
            this.firebaseAuth.changePassword(res.email);
          }
        }
      ]
    });

    await alert.present();
  }

  onSubmit() {
    this.firebaseAuth.login(this.loginForm.value);
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }
}
