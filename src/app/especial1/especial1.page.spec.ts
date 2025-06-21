import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Especial1Page } from './especial1.page';

describe('Especial1Page', () => {
  let component: Especial1Page;
  let fixture: ComponentFixture<Especial1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Especial1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
