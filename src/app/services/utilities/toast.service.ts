import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: ToastController) {}

  async presentToastWithOptions(header, message, position, duration = 1500) {
    const toast = await this.toast.create({
      header,
      message,
      position,
      duration
    });
    toast.present();
  }
}
