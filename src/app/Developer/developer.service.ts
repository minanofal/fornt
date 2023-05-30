import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Developer, DeveloperCreate, DeveloperLite, ResponsDeveloper, SearchDeveloper } from '../domain/Developer/developer';
import { Observable } from 'rxjs';
import { DropDown } from '../domain/DropDown/DropDown';
const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
const httpOptions = {
  headers: headers_object
};
@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  DevekoerBaseUrl = environment.baseURL+"api/Developers/";
  constructor(private http : HttpClient) { }

  getDeveloperLite(search: SearchDeveloper): Observable<ResponsDeveloper>{
    return this.http.post<ResponsDeveloper>(this.DevekoerBaseUrl+"lite",search, httpOptions);
  }
  createDeveloper(Create : DeveloperCreate): Observable<Developer>{
   const data = new FormData();
   data.append('name', Create.name);
   data.append('nameInArabic', Create.nameInArabic);
   data.append('descriptionInArabic', Create.descriptionInArabic);
   data.append('description', Create.description);
   data.append('desplayOrder', Create.desplayOrder.toString());
   data.append('picture', Create.picture);
    return this.http.post<Developer>(this.DevekoerBaseUrl ,data, httpOptions);
  }
  getDeveloper(id : number) : Observable<Developer>{
    return this.http.get<Developer>(this.DevekoerBaseUrl + id,httpOptions);
  }
  updateDeveloper(Create : DeveloperCreate): Observable<Developer>{
    const data = new FormData();
   data.append('name', Create.name);
   data.append('nameInArabic', Create.nameInArabic);
   data.append('descriptionInArabic', Create.descriptionInArabic);
   data.append('description', Create.description);
   data.append('desplayOrder', Create.desplayOrder.toString());
   data.append('id',Create.id.toString());
   data.append('storageFileId',Create.storageFileId.toString());
   if(Create.picture != null){
   data.append('picture', Create.picture);
   }
    return this.http.put<Developer>(this.DevekoerBaseUrl ,data, httpOptions);
  }
  DropDown() : Observable<DropDown[]>{
    return this.http.get<DropDown[]>(this.DevekoerBaseUrl+"dropdown",httpOptions);
  }
}
