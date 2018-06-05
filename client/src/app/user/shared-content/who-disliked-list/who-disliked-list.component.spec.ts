import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoDislikedListComponent } from './who-disliked-list.component';

describe('WhoDislikedListComponent', () => {
  let component: WhoDislikedListComponent;
  let fixture: ComponentFixture<WhoDislikedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoDislikedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoDislikedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
