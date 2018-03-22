import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api/auth`;

@Injectable()
export class AuthProvider {
  options:object = {
    withCredentials:true,
  }

  errors: Array<string> = [
    'usuario o contraseña incorrecto',
    'no puedes campos vacíos'
  ]

  user:object;
  loginEvent:EventEmitter<object> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  handleError(e) {
    const error_message = e.message;
    console.error(error_message);
  }

  handleUser(obj) {
    this.user = obj;
    this.loginEvent.emit(this.user);
    return this.user;
  }

  signup(username,password) {
    return this.http.post(`${BASE_URL}/signup`, {username, password}, this.options)
      .map(user => this.handleUser(user))
      // .catch(this.handleError);
  }

  login(username:string, password:string) {
    console.log(`Login with user:${username} and password ${password}`);
    return this.http.post(`${BASE_URL}/login`, {username, password}, this.options)
      .map(user => this.handleUser(user))
      // .catch(this.handleError);
  }

  logout() {
    console.log('intento hacer logout')
    return this.http.get(`${BASE_URL}/logout`,this.options)
      .map(user => this.handleUser(null))
      // .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASE_URL}/loggedin`,this.options)
  }

  recoverPassword(email){
    console.log('entro en el servicio')
    console.log(email)
    return this.http.post(`${BASE_URL}/sendEmail`, { email }, this.options)
  }
}
