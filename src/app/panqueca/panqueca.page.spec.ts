import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanquecaPage } from './panqueca.page';

describe('PanquecaPage', () => {
  let component: PanquecaPage;
  let fixture: ComponentFixture<PanquecaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanquecaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
