import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairingSearchComponent } from './pairing-search.component';

describe('PairingSearchComponent', () => {
  let component: PairingSearchComponent;
  let fixture: ComponentFixture<PairingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairingSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PairingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
