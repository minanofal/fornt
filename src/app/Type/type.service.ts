import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeLite, TypeSearch ,Type} from '../domain/Type/type';
const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
const httpOptions = {
  headers: headers_object
};
@Injectable({
  providedIn: 'root'
})
export class TypeService {

  CityBaseUrl = environment.baseURL+"api/Types/";
  constructor(private http : HttpClient) { }
getCategories(search: TypeSearch) : Observable<TypeLite[]>{
  return this.http.post<TypeLite[]>(this.CityBaseUrl+"lite", search,httpOptions);
}
CreateType(Type: Type) : Observable<Type>{
  return this.http.post<Type>(this.CityBaseUrl, Type,httpOptions);
}
updateType(Type: Type) : Observable<Type>{
  return this.http.put<Type>(this.CityBaseUrl, Type,httpOptions);
}
getType(productId : number): Observable<Type>{
  return this.http.get<Type>(this.CityBaseUrl+ productId.toString(), httpOptions);
}
}
