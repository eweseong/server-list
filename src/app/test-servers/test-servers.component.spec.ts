import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { NgBusyModule } from 'ng-busy';

import { VirtualMachineComponent } from '../virtual-machine/virtual-machine.component';
import { TestServersComponent } from './test-servers.component';

xdescribe('TestServersComponent', () => {
  let component: TestServersComponent;
  let fixture: ComponentFixture<TestServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestServersComponent,
        VirtualMachineComponent,
      ],
      imports: [
        MatIconModule,
        NgBusyModule,
      ],
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
