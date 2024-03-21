import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureSearchComponent } from './creature-search.component';

describe('CreatureSearchComponent', () => {
  let component: CreatureSearchComponent;
  let fixture: ComponentFixture<CreatureSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatureSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatureSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
