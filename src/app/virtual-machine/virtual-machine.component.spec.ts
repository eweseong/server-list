import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { NgBusyModule } from 'ng-busy';

import { ActivatedRouteStub } from '../../test/stub/ActivatedRouteStub';
import { VirtualMachineComponent } from './virtual-machine.component';

describe('VirtualMachineComponent', () => {
  let activatedRoute: ActivatedRouteStub;
  let component: VirtualMachineComponent;
  let fixture: ComponentFixture<VirtualMachineComponent>;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub({});
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VirtualMachineComponent,
      ],
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        NgBusyModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized with a false editable flag', () => {
    expect(component.editable).toBe(false);
  });

  it('should update editable flag when query parameter is configured', () => {
    activatedRoute.setQueryParams({ editable: true });
    fixture.detectChanges();
    expect(component.editable).toBe(true);
  });
});
