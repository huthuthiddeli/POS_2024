import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseBodyComponent } from './horse-body.component';

describe('HorseBodyComponent', () => {
  let component: HorseBodyComponent;
  let fixture: ComponentFixture<HorseBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorseBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
