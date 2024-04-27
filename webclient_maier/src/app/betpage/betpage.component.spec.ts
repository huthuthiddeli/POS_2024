import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetpageComponent } from './betpage.component';

describe('BetpageComponent', () => {
  let component: BetpageComponent;
  let fixture: ComponentFixture<BetpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
