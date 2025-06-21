import { Injectable } from '@angular/core';

export interface ItemAdicionado {
  nome: string;
  quantidade: number;
  precoUnit: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itens: ItemAdicionado[] = [];

  constructor() {}

  getItems(): ItemAdicionado[] {
    return this.itens;
  }

  setItems(itens: ItemAdicionado[]) {
    this.itens = itens;
  }

  addItem(nome: string, precoStr: string, quantidade: number) {
    const precoUnit = this.precoStrToNumber(precoStr);
    const index = this.itens.findIndex(item => item.nome === nome);

    if (index > -1) {
      this.itens[index].quantidade += quantidade;
      this.itens[index].total = this.itens[index].quantidade * this.itens[index].precoUnit;
    } else {
      this.itens.push({
        nome,
        quantidade,
        precoUnit,
        total: precoUnit * quantidade
      });
    }
  }

  updateItemQuantity(nome: string, novaQuantidade: number) {
    const index = this.itens.findIndex(item => item.nome === nome);
    if (index > -1) {
      if (novaQuantidade <= 0) {
        this.itens.splice(index, 1);
      } else {
        this.itens[index].quantidade = novaQuantidade;
        this.itens[index].total = novaQuantidade * this.itens[index].precoUnit;
      }
    }
  }

  removeItem(nome: string) {
    const index = this.itens.findIndex(item => item.nome === nome);
    if (index > -1) {
      this.itens.splice(index, 1);
    }
  }

  private precoStrToNumber(precoStr: string): number {
    return Number(precoStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
  }
}
