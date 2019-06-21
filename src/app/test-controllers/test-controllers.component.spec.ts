import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestControllersComponent } from './test-controllers.component';

describe('TestControllersComponent', () => {
  let component: TestControllersComponent;
  let fixture: ComponentFixture<TestControllersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestControllersComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
