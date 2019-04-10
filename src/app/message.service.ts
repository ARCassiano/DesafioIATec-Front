import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  //messages: string[] = [];

  constructor(private snackBar: MatSnackBar){}

  add(message: string) {
    //this.clear();
    //this.messages.push(message);
    this.openSnackBar(message, 'fechar');
  }

  /*clear() {
    this.messages = [];
  }*/

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}