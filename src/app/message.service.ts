import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  remove(index: number) {
    this.messages.splice(index, 1);
  }

  clear() {
    this.messages = [];
  }
}
