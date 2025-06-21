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
  selector: 'app-panqueca',
  templateUrl: './panqueca.page.html',
  styleUrls: ['./panqueca.page.scss'],
  standalone: true,
  imports: [
    IonItem, IonLabel,
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
    RouterModule,
  ],
})
export class PanquecaPage {
  quantidade: number = 1;

  constructor(private itemService: ItemService, private toastController: ToastController) {}

  async adicionarAoMercado() {
    if (this.quantidade < 1) this.quantidade = 1;
    this.itemService.addItem('Panqueca', 'R$ 12,00', this.quantidade);

    // Mostrar toast de confirmação
    const toast = await this.toastController.create({
      message: `Adicionado ${this.quantidade} panqueca(s) ao carrinho!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    this.quantidade = 1; // reseta após adicionar
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
