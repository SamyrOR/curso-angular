import { TestBed } from '@angular/core/testing';

import { CursoGuard } from './curso.guard';

describe('CursoGuard', () => {
  let guard: CursoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CursoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
