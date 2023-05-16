import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
    });
  }
}
