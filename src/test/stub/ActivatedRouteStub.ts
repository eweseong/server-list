import { Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `queryParams` observable.
 * Use the `setQueryParams()` method to add the next `queryParams` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `queryParams` observable
  private subject = new ReplaySubject<Params>();

  constructor(initialParams?: Params) {
    this.setQueryParams(initialParams);
  }

  /** The mock queryParams observable */
  readonly queryParams = this.subject.asObservable();

  /** Set the queryParams observables's next value */
  setQueryParams(params?: Params) {
    this.subject.next(params);
  }
}
