import { Injectable } from "@angular/core";

// @Injectable({
//   providedIn: 'root',
// })
export class LogginService {
  laslog: string = null;

  printLog(message: string): void {
    console.log(message);
    console.log(this.laslog);
    this.laslog = message;
  }
}