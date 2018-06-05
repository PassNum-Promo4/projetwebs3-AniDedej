import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhosGoingListComponent } from './whos-going-list.component';

describe('WhosGoingListComponent', () => {
  let component: WhosGoingListComponent;
  let fixture: ComponentFixture<WhosGoingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhosGoingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhosGoingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
