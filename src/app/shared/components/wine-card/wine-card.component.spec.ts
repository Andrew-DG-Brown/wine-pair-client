import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineCardComponent } from './wine-card.component';

describe('WineCardComponent', () => {
  let component: WineCardComponent;
  let fixture: ComponentFixture<WineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
