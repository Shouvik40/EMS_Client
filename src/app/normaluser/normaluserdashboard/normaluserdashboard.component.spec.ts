import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaluserdashboardComponent } from './normaluserdashboard.component';

describe('NormaluserdashboardComponent', () => {
  let component: NormaluserdashboardComponent;
  let fixture: ComponentFixture<NormaluserdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NormaluserdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormaluserdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
