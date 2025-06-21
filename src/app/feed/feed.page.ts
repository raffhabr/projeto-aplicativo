import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, IonicModule,RouterModule],
})
export class FeedPage implements OnInit {
  todasRefeicoes: any[] = [];
  refeicoesMostradas: any[] = [];
  pagina = 0;
  limite = 5;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarTodasAsRefeicoes();
  }

  carregarTodasAsRefeicoes() {
    this.http.get<any>('https://themealdb.com/api/json/v1/1/search.php?s=')
      .subscribe(res => {
        this.todasRefeicoes = res.meals || [];
        this.carregarMaisRefeicoes();
      });
  }

  carregarMaisRefeicoes(event?: any) {
    const inicio = this.pagina * this.limite;
    const fim = inicio + this.limite;
    const novos = this.todasRefeicoes.slice(inicio, fim);
    this.refeicoesMostradas = [...this.refeicoesMostradas, ...novos];
    this.pagina++;

    if (event) event.target.complete();
  }
}
