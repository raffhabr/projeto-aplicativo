import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../services/item.service';

import {
  IonItem, IonLabel,
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  ToastController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-especial1',
  templateUrl: './especial1.page.html',
  styleUrls: ['./especial1.page.scss'],
  standalone: true,
  imports: [
    IonItem, IonLabel,
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
    RouterModule,
  ],
})
export class Especial1Page {
  quantidade: number = 1;

  constructor(private itemService: ItemService, private toastController: ToastController) {}

  async adicionarAoMercado() {
    if (this.quantidade < 1) this.quantidade = 1;
    this.itemService.addItem('Especial 1', 'R$ 20,00', this.quantidade);

    const toast = await this.toastController.create({
      message: `Adicionado ${this.quantidade} especial 1(s) ao carrinho!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    this.quantidade = 1;
  }

  aumentarQuantidade() {
    this.quantidade++;
  }

  diminuirQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }
}
