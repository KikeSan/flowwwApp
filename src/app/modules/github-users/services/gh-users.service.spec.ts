import { TestBed } from '@angular/core/testing';

import { GhUsersService } from './gh-users.service';

describe('GhUsersService', () => {
  let service: GhUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
