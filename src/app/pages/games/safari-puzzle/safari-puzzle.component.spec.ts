import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafariPuzzleComponent } from './safari-puzzle.component';

describe('SafariPuzzleComponent', () => {
  let component: SafariPuzzleComponent;
  let fixture: ComponentFixture<SafariPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SafariPuzzleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafariPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
