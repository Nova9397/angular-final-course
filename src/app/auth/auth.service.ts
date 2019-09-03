import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; //its optional nqs esht log in do e perdori nqs esht sign up nuk do e perdori
}


@Injectable()
export class AuthService {

 constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA64gHs81KxZY0r4-1V-6lE5liCQea778Y',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
          }
          return throwError(errorMessage);
        })
      );
}



  login(email: string, password: string){
   return this.http.
   post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPasswordkey=AIzaSyA64gHs81KxZY0r4-1V-6lE5liCQea778Y',
        {
          email: email,
          password: password,
          returnSecureToken: true
        })

  }
}