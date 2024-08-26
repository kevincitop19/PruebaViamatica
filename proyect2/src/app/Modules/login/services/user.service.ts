import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserCreate } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7275/api/User';  // Cambia la URL si es necesario
  

  constructor(private http: HttpClient) { }
  username: string= '';
  idUser?: number ;
  // Registrar un nuevo usuario
  registerUser(user: UserCreate): Observable<UserCreate> {
    return this.http.post<UserCreate>(`${this.apiUrl}/Register`, user);
  }



  // Login de usuario
  login(username: string, password: string): Observable<User> {
    this.username= username;

    return this.http.post<User>(`https://localhost:7275/login?username=${username}&password=${password}`, {});
  }
  
  

  getUsername (): string{
    return this.username;
  }
}
