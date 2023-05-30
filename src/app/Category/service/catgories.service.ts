import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryLite, CategorySearch } from 'src/app/domain/Category/category';
import { environment } from 'src/environments/environment';
const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
const httpOptions = {
  headers: headers_object
};
@Injectable({
  providedIn: 'root'
})
export class CatgoriesService {
  CityBaseUrl = environment.baseURL+"api/Categories/";
  constructor(private http : HttpClient) { }
getCategories(search: CategorySearch) : Observable<CategoryLite[]>{
  return this.http.post<CategoryLite[]>(this.CityBaseUrl+"lite", search,httpOptions);
}
CreateCategory(category: Category) : Observable<Category>{
  return this.http.post<Category>(this.CityBaseUrl, category,httpOptions);
}
updateCategory(category: Category) : Observable<Category>{
  return this.http.put<Category>(this.CityBaseUrl, category,httpOptions);
}
getCategory(productId : number): Observable<Category>{
  return this.http.get<Category>(this.CityBaseUrl+ productId.toString(), httpOptions);
}


}
