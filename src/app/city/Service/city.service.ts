import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City,  SearchCity } from 'src/app/domain/City/city';
import { DropDown } from 'src/app/domain/DropDown/DropDown';
import { environment } from 'src/environments/environment';
const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
const httpOptions = {
  headers: headers_object
};
@Injectable({
  providedIn: 'root'
})
export class CityService {
  CityBaseUrl = environment.baseURL+"api/Cities/";
  constructor(private http : HttpClient) { }
getCities(search: SearchCity) : Observable<City[]>{
  return this.http.post<City[]>(this.CityBaseUrl, search,httpOptions);
}
CreateCity(city : City): Observable<City>{
  return this.http.post<City>(this.CityBaseUrl+"Create", city,httpOptions);
}
getCity(id : number) : Observable<City> {
  return this.http.get<City>(this.CityBaseUrl + id.toString(),httpOptions);
}
UpdateCity(city : City): Observable<City>{
  return this.http.put<City>(this.CityBaseUrl, city,httpOptions);
}
DropDown() : Observable<DropDown[]>{
  return this.http.get<DropDown[]>(this.CityBaseUrl+"dropdown",httpOptions);
}
}
