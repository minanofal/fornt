import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Auth, responsUser, RolesdropDown, SearchUsers, UserRegister } from 'src/app/domain/Auth';
import { login } from 'src/app/domain/Login-user';
import { UserLit } from 'src/app/domain/User';
import { environment } from 'src/environments/environment';

const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
const httpOptions = {
  headers: headers_object
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AuthBaseUrl = environment.baseURL+"api/Authentications/";
  // currentUser : Auth = {email:"",firstName:"",expire:"",id:"",isAuthenticated:false,lastName:"",message:"",roles:[""],token:"",userName:""};
  // currentUser = new Subject<Auth>();
  currentUser : Auth;
  constructor(private http : HttpClient) { }

  Login(from : login) : Observable<Auth>{
    return this.http.post<Auth>(this.AuthBaseUrl+"Login",from);
  }
  getUsers(SearchUsers : SearchUsers) : Observable<responsUser>{
    return this.http.post<responsUser>(this.AuthBaseUrl + "lite",SearchUsers,httpOptions);
  }
  getRoles():  Observable<RolesdropDown[]>{
    return this.http.get<RolesdropDown[]>(this.AuthBaseUrl + "Roles",httpOptions);
}
  Rgister(user : UserRegister): Observable<any>{
    return this.http.post<any>(this.AuthBaseUrl + "Register", user, httpOptions);
  }
  getDetail(id: string): Observable<UserRegister>{
    return this.http.get<UserRegister>(this.AuthBaseUrl+id, httpOptions);
  }
  UpdateUser(user : UserRegister) : Observable<any>{
    return this.http.put<any>(this.AuthBaseUrl + "Update", user, httpOptions);
  }
}