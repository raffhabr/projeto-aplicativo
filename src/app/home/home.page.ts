import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { RouterModule, Router } from '@angular/router';
import { ItemService, ItemAdicionado } from '../services/item.service';

import {IonFooter,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

import { auth } from '../firebase'; // ajuste o caminho conforme seu projeto
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFooter,
    CommonModule,
    IonButton,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonSearchbar,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
    IonIcon,
    RouterModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
})
export class HomePage {
  busca: string = '';
  itensAdicionados: ItemAdicionado[] = [];
  totalGeral: number = 0;

  usuarioId: string | null = null;  // novo: guarda o ID do usuário logado

  get usuarioIdCurto(): string | null {
  return this.usuarioId ? this.usuarioId.substring(0, 4) : null;
}


  itens = [
    {
      nome: 'Panqueca',
      descricao: 'Deliciosa panqueca simples',
      preco: 'R$ 12,00',
      precoUnit: 12.00,
      img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg'
    },
    {
      nome: 'Panqueca com Nutella',
      descricao: 'Panqueca recheada com Nutella e frutas',
      preco: 'R$ 15,00',
      precoUnit: 15.00,
      img: 'https://images.pexels.com/photos/18908094/pexels-photo-18908094/free-photo-of-placa-prato-frutas-frutos.jpeg'
    },
    {
      nome: 'Item Especial 1',
      descricao: 'Item especial do dia',
      preco: 'R$ 18,00',
      precoUnit: 18.00,
      img: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg'
    },
  ];

  map: any;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.atualizarItens();

    // Monitorar o estado do usuário
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        this.usuarioId = user.uid;
      } else {
        this.usuarioId = null;
        this.router.navigate(['/login']); // manda para login se não estiver logado
      }
    });
  }

  ionViewWillEnter() {
    this.atualizarItens();
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  atualizarItens() {
    this.itensAdicionados = this.itemService.getItems();
    this.calcularTotalGeral();
  }

  get itensFiltrados() {
    if (!this.busca || this.busca.trim() === '') {
      return this.itens;
    }
    const buscaLower = this.busca.toLowerCase();
    return this.itens.filter(item =>
      item.nome.toLowerCase().includes(buscaLower) ||
      (item.descricao && item.descricao.toLowerCase().includes(buscaLower))
    );
  }

  calcularTotalGeral() {
    this.totalGeral = this.itensAdicionados.reduce((acc, item) => acc + item.total, 0);
  }

  totalGeralFormatado(): string {
    return this.totalGeral.toFixed(2).replace('.', ',');
  }

  loadMap() {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map').setView([-23.55052, -46.633308], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([-23.55052, -46.633308]).addTo(this.map)
      .bindPopup('Meu Restaurante')
      .openPopup();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }

  handleScrollStart(event: any) {}
  handleScroll(event: any) {}
  handleScrollEnd(event: any) {}

  incrementarQuantidade(item: ItemAdicionado) {
    this.itemService.updateItemQuantity(item.nome, item.quantidade + 1);
    this.atualizarItens();
  }

  decrementarQuantidade(item: ItemAdicionado) {
    if (item.quantidade > 1) {
      this.itemService.updateItemQuantity(item.nome, item.quantidade - 1);
      this.atualizarItens();
    }
  }

  removerItem(item: ItemAdicionado) {
    this.itemService.removeItem(item.nome);
    this.atualizarItens();
  }

  navegarPara(itemNome: string) {
    let rota: string | null = null;
    if (itemNome === 'Panqueca') rota = '/panqueca';
    else if (itemNome === 'Panqueca com Nutella') rota = '/panqueca-nutella';
    else if (itemNome === 'Item Especial 1') rota = '/especial1';

    if (rota) {
      this.router.navigate([rota]);
    }
  }

  async logout() {
    await signOut(auth);
    this.router.navigate(['/login']);
  }
}
