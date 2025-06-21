import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importação essencial para routerLink

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, 
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class LoginPage {
  email = '';
  senha = '';
  erroMsg = '';

  constructor(private router: Router) {}

  async login() {
    this.erroMsg = '';
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.senha);
      console.log('Usuário logado:', userCredential.user.uid);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.erroMsg = error.message;
      console.error('Erro no login:', error);
    }
  }
}
