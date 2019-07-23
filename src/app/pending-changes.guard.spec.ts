import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate, PendingChangesGuard } from './pending-changes.guard';

class MockComponent implements ComponentCanDeactivate {
  returnValue: boolean | Observable<boolean>;

  canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}

describe('PendingChangesGuard', () => {
  let guard: PendingChangesGuard;
  let mockComponent: MockComponent;

  beforeEach(() => {
    spyOn(window, 'confirm');

    TestBed.configureTestingModule({
      providers: [
        PendingChangesGuard,
        MockComponent,
      ],
    });
    guard = TestBed.get(PendingChangesGuard);
    mockComponent = TestBed.get(MockComponent);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow routing if unguarded', () => {
    mockComponent.returnValue = true;
    expect(guard.canDeactivate(mockComponent)).toBeTruthy();
  });

  it('should prompt window confirmation if guarded', () => {
    expect(window.confirm).not.toHaveBeenCalled();
    mockComponent.returnValue = false;
    guard.canDeactivate(mockComponent);
    expect(window.confirm).toHaveBeenCalledTimes(1);
    // tslint:disable-next-line:max-line-length
    expect(window.confirm).toHaveBeenCalledWith('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
  });

});
