import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { CustomBusyComponent } from './custom-busy.component';

describe('CustomBusyComponent', () => {
  let component: CustomBusyComponent;
  let fixture: ComponentFixture<CustomBusyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomBusyComponent,
      ],
      imports: [
        MatProgressSpinnerModule,
      ],
      providers: [{ provide: 'instanceConfigHolder', useValue: { config: { message : 'hello' } } }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message in default text element', () => {
    expect(fixture.debugElement.query(By.css('.ng-busy-default-text')).nativeElement.innerText).toBe('hello');
  });
});
