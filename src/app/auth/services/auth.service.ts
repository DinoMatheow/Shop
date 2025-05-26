import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'no-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);


  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(()=>{

    if( this._authStatus() == 'checking') return 'checking';

    if( this._user()){
      return 'authenticated'
    }

    return 'no-authenticated'
  });


  user = computed(()=> this._user())
  token = computed(this._token);


  login(email:string, password:string){
    return this.http.post(`${baseUrl}/auth/login`, {
      email: email,
      password: password,
    })
  }


}
