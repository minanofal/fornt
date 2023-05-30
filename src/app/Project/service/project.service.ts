import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateProject, NewImage, ProjecrImage, Project, ResponsProjects, SearchProject } from 'src/app/domain/Project/Project';
import { environment } from 'src/environments/environment';

const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"));
const httpOptions = {
  headers: headers_object
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  newMainImage : BehaviorSubject<File> ;
  newImages : BehaviorSubject<NewImage[]> = new BehaviorSubject<NewImage[]>([]);
  deletedImages: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
 currentProject: BehaviorSubject<Project> = new BehaviorSubject<Project>({
  areaId: 0,
  description:"",
  descriptionInArabic:"",
  developerId:0,
  id:0,
  images: [],
  mainImage:{
    id:0,
    image:new Uint8Array(255),
    isMain: true,
    storageFileId:0
  },
  isPublished:false,
  loacationUrl:"",
  name:"",
  nameInArabic:"",
  videoUrl:"",
  displayOrder:999,
  deleveryDate: new Date().toString()
 });
  productUrl = environment.baseURL+"api/Projects/";
  projectImagesUrl = environment.baseURL+ "api/ProjectImages/"
  constructor(private http : HttpClient) { }

  getProjectsLite(search: SearchProject): Observable<ResponsProjects>{
    return this.http.post<ResponsProjects>(this.productUrl+"lite",search, httpOptions);
  }

  createProject(project : CreateProject): Observable<Project>{
    const data = new FormData();
    data.append('name', project.name);
    data.append('nameInArabic', project.nameInArabic);
    data.append('descriptionInArabic', project.descriptionInArabic);
    data.append('description', project.description);
   data.append('displayOrder', project.displayOrder.toString());
   if(this.newMainImage.value){
    data.append('mainImage', this.newMainImage.value);
   }
    data.append('loacationUrl',project.loacationUrl);
    data.append('videoUrl',project.VideoUrl);
    data.append('areaId',project.areaId.toString());
    data.append('developerId',project.developerId.toString());
    data.append("deleveryDate",project.deleveryDate.toString());
    return this.http.post<Project>(this.productUrl,data,httpOptions);
  }
  getProject(id: number){
     this.http.get<Project>(this.productUrl+id,httpOptions).subscribe( x =>
     { this.currentProject.next(x);
    })
  }

  Update(project : CreateProject): Observable<Project>{
    const data = new FormData();
    data.append('id',this.currentProject.value.id.toString());
    data.append('name', project.name);
    data.append('nameInArabic', project.nameInArabic);
    data.append('descriptionInArabic', project.descriptionInArabic);
    data.append('description', project.description);
   data.append('displayOrder', project.displayOrder.toString());
   if(this.newMainImage){
    data.append('mainImage', this.newMainImage.value);
   }
   
    data.append('loacationUrl',project.loacationUrl);
    data.append('videoUrl',project.VideoUrl);
    data.append('areaId',project.areaId.toString());
    data.append('deleveryDates',project.deleveryDate.toString());
    data.append('developerId',project.developerId.toString());
    for(let i =0; i< this.newImages.value.length; i++){
      data.append('projectImages',this.newImages.value[i].image)
    }
    for(let i =0; i< this.currentProject.value.images.length; i++){
      data.append('orderImage',this.currentProject.value.images[i].id.toString())
    }
    for(let i =0; i< this.deletedImages.value.length; i++){
      data.append('deletedImages',this.deletedImages.value[i].toString())
    }
    return this.http.put<Project>(this.productUrl,data,httpOptions);
  }
  publish(id: number){
    return this.http.put(this.productUrl+"publish/"+id,httpOptions);
  }
  addImages(id: number, files: File[]):Observable<ProjecrImage[]> {
    const data = new FormData();
    for(let i =0; i< files.length; i++){
      data.append('images',files[i])
    }
    return this.http.post<ProjecrImage[]>(this.projectImagesUrl+id,data, httpOptions);
  }
}
