import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardBtnComponent } from './add-card-btn.component';

describe('AddCardBtnComponent', () => {
  let component: AddCardBtnComponent;
  let fixture: ComponentFixture<AddCardBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
