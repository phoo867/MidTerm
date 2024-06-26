import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureDetailComponent } from './creature-detail.component';

describe('CreatureDetailComponent', () => {
  let component: CreatureDetailComponent;
  let fixture: ComponentFixture<CreatureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatureDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
