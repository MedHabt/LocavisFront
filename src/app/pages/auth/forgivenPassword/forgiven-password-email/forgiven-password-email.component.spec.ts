import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgivenPasswordEmailComponent } from './forgiven-password-email.component';

describe('ForgivenPasswordEmailComponent', () => {
  let component: ForgivenPasswordEmailComponent;
  let fixture: ComponentFixture<ForgivenPasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgivenPasswordEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgivenPasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
