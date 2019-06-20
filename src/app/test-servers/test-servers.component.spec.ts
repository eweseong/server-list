import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestServersComponent } from './test-servers.component';

describe('TestServersComponent', () => {
  let component: TestServersComponent;
  let fixture: ComponentFixture<TestServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
