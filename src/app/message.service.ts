import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(private snackBar: MatSnackBar) {}

  add(message: string) {
    this.messages.push(message);
  }

  prompt(message: string) {
    this.snackBar.open(message);
  }

  remove(index: number) {
    this.messages.splice(index, 1);
  }

  clear() {
    this.messages = [];
  }
}
