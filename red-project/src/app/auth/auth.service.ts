import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, } from "rxjs/operators";
import { Observable, Subject, throwError } from "rxjs";
import { AuthResponseData } from "./auth.model";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlAuth: string = 'https://identitytoolkit.googleapis.com/v1/';
  private urlSignup: string = 'accounts:signUp?key=';
  private urlLogin: string = 'accounts:signInWithPassword?key=';
  private apiKey: string = 'AIzaSyCQX7qVP2cpW7x9ctJKG48OKOFOLhTrahU';

  user: Subject<User> = new Subject<User>();
  
  constructor(private http: HttpClient)
  {}
  
  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlAuth + this.urlSignup + this.apiKey, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError), tap(this.handleAuthentication));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlAuth + this.urlLogin + this.apiKey, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError), tap(this.handleAuthentication));
  }

  private handleAuthentication(response): void {
    const expirationDate = new Date(new Date().getTime() + (Number(response.expiresIn) * 1000));
    const user = new User(response.email, response.localId, response.idToken, expirationDate);
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let errorMessage: string = 'An unknown error ocurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists alreadly!'
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled!'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later!'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct!'
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator!'
        break;
      default:
        errorMessage = 'Something else happened!';
        break;
    }
    return throwError(errorMessage);
  }
}
