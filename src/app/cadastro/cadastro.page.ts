import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonToolbar,
    IonTitle,
  ],
})
export class CadastroPage {
  email = '';
  senha = '';
  erroMsg = '';
  sucessoMsg = '';

  constructor(private router: Router) {}

  async cadastrar() {
    this.erroMsg = '';
    this.sucessoMsg = '';
    try {
      const cred = await createUserWithEmailAndPassword(auth, this.email, this.senha);
      console.log('Usuário criado:', cred.user.uid);
      this.sucessoMsg = 'Cadastro realizado com sucesso!';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } catch (error: any) {
      this.erroMsg = error.message;
      console.error('Erro no cadastro:', error);
    }
  }
}
