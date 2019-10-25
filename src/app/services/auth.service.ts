import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;

  constructor(    private http: HttpClient,
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private env: EnvService,) { }

    login(username: String, password: String) {
      return this.http.post(this.env.API_URL + '/api/login_check',
        {username: username, password: password}
      ).pipe(
        tap(token => {
          this.storage.set('token', token)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
          this.token = token;
          this.isLoggedIn = true;
          return token;
        }),
      );
    }

    transaction(prenomben: String, nomben: String, telephoneben: String, prenomexp: String, nomexp: String, telephoneexp: String, montant: String, cni: String,) {
      return this.http.post(this.env.API_URL + 'auth/register',
        {prenomben: prenomben, nomben: nomben, telephoneben: telephoneben, prenomexp: prenomexp, nomexp: nomexp, telephonexp: telephoneexp, montant: montant, cni: cni}
      )
    }

    logout() {
       this.storage.remove("token");
       this.router.navigateByUrl("/login");
      //this.navCtrl.navigateRoot('/login');
    }
    user() {
      const headers = new HttpHeaders({
        'Authorization': this.token["token_type"]+" "+this.token["access_token"]
      });
      return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      )
    }
    // getToken() {
    //   return localStorage.getItem('token');
      
    // }
    getToken() {
      return this.storage.get('token').then(
        data => {
          this.token = data;
          if(this.token != null) {
            this.isLoggedIn=true;
          } else {
            this.isLoggedIn=false;
          }
        },
        error => {
          this.token = null;
          this.isLoggedIn=false;
        }
      );
    }
}
