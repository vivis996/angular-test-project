import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthResponseData } from "./auth.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlAuth: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private apiKey: string = 'AIzaSyCQX7qVP2cpW7x9ctJKG48OKOFOLhTrahU';
  
  constructor(private http: HttpClient)
  {}
  
  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlAuth + this.apiKey,{
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(errorResponse => {
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
          default:
            errorMessage = 'Something else happened!';
            break;
        }
        return throwError(errorMessage);
      }));
  }
}
