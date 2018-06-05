import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoLikedListComponent } from './who-liked-list.component';

describe('WhoLikedListComponent', () => {
  let component: WhoLikedListComponent;
  let fixture: ComponentFixture<WhoLikedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoLikedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoLikedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
