import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area, AreaDetrail, SearchArea } from 'src/app/domain/Area/Area';
import { DropDown } from 'src/app/domain/DropDown/DropDown';
import { environment } from 'src/environments/environment';
const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
const httpOptions = {
  headers: headers_object
};
@Injectable({
  providedIn: 'root'
})
export class AreaService {

  AreaBaseUrl = environment.baseURL+"api/Areas/";
  constructor(private http : HttpClient) { }
getAreas(search: SearchArea) : Observable<Area[]>{
  return this.http.post<Area[]>(this.AreaBaseUrl, search,httpOptions);
}
CreateArea(Area : AreaDetrail): Observable<AreaDetrail>{
  return this.http.post<AreaDetrail>(this.AreaBaseUrl+"Create", Area,httpOptions);
}
getArea(id : number) : Observable<AreaDetrail> {
  return this.http.get<AreaDetrail>(this.AreaBaseUrl + id.toString(),httpOptions);
}
UpdateArea(Area : AreaDetrail): Observable<AreaDetrail>{
  return this.http.put<AreaDetrail>(this.AreaBaseUrl, Area,httpOptions);
}
DropDown() : Observable<DropDown[]>{
  return this.http.get<DropDown[]>(this.AreaBaseUrl+"dropdown",httpOptions);
}
}
