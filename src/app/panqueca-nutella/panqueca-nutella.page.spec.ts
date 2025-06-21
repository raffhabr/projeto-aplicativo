import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanquecaNutellaPage } from './panqueca-nutella.page';

describe('PanquecaNutellaPage', () => {
  let component: PanquecaNutellaPage;
  let fixture: ComponentFixture<PanquecaNutellaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanquecaNutellaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
