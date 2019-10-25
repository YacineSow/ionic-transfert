import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
//import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  bouton:boolean;

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  // async loginModal() {
  //   this.dismissRegister();
  //   const loginModal = await this.modalController.create({
  //     component: LoginPage,
  //   });
  //   return await loginModal.present();
  // }
  transaction(form: NgForm) {
    this.authService.transaction(form.value.prenomben, form.value.nomben, form.value.telephoneben, form.value.prenomexp, form.value.nomexp, form.value.telephoneexp, form.value.montant, form.value.cni).subscribe(
      data => {
        this.authService.login(form.value.usename, form.value.password).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/liste');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );
  }

  buttonEnvoie(){
    this.bouton = false; 
  }

  buttonRetrait(){
    this.bouton = true; 
  }
}
