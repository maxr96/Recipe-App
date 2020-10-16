import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}
    
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('',
        {
            email,
            password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            let errorMessage = 'An uknown error occured!';
            
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS': 
                    errorMessage = 'This email already exists'
        }
        return throwError(errorMessage);
    }));
    }
}