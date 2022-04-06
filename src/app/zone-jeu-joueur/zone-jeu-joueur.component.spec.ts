import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneJeuJoueurComponent } from './zone-jeu-joueur.component';

describe('ZoneJeuJoueurComponent', () => {
  let component: ZoneJeuJoueurComponent;
  let fixture: ComponentFixture<ZoneJeuJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneJeuJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneJeuJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
