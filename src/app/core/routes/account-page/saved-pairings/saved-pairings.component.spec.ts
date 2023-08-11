import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPairingsComponent } from './saved-pairings.component';

describe('SavedPairingsComponent', () => {
  let component: SavedPairingsComponent;
  let fixture: ComponentFixture<SavedPairingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPairingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPairingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
