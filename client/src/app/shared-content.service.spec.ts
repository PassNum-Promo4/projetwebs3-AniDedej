import { TestBed, inject } from '@angular/core/testing';

import { SharedContentService } from './shared-content.service';

describe('SharedContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedContentService]
    });
  });

  it('should be created', inject([SharedContentService], (service: SharedContentService) => {
    expect(service).toBeTruthy();
  }));
});
