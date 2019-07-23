import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  const MESSAGE_ELEMENT = By.css('.alert');

  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      imports: [MatSnackBarModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be hidden when message list is empty', () => {
    expect(element.query(MESSAGE_ELEMENT)).toBeNull();
  });

  it('should display message when message list is not empty', () => {
    component.messageService.add('lorem ipsum');
    fixture.detectChanges();
    expect(element.query(MESSAGE_ELEMENT).nativeElement.innerText.includes('lorem ipsum')).toBeTruthy();
  });

  it('should remove message when cross button (x) is clicked', () => {
    component.messageService.add('lorem ipsum');
    fixture.detectChanges();
    element.query(By.css('.close')).nativeElement.click();
    fixture.detectChanges();
    expect(element.query(MESSAGE_ELEMENT)).toBeNull();
  });
});
