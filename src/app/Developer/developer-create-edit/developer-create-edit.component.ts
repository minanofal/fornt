import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Developer, DeveloperCreate } from 'src/app/domain/Developer/developer';
import { DeveloperService } from '../developer.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-developer-create-edit',
  templateUrl: './developer-create-edit.component.html',
  styleUrls: ['./developer-create-edit.component.scss']
})
export class DeveloperCreateEditComponent implements OnInit {
  id: number;
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEnglishName : boolean = true;
  isArabicName : boolean = true;
  isArabicDiscription :boolean =true;
  isEnglishDiscription :boolean =true;
  isNewImage: boolean ;
  Photo : File;
  newImageUrl: string = "../../../assets/Iamges/image.jpg";
  developer: Developer = {
    description:'',
    descriptionInArabic:'',
    desplayOrder:999,
    name:'',
    id:0,
    nameInArabic:'',
    picture: new Uint8Array(255),
    storageFileId:0,
  };
  constructor(private developerService: DeveloperService, private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
    this.route.params.subscribe((x) => (this.id = x['id']));
    this.busy.next(true);
    this.load.next(false);
    if(this.id !=0 ){
 
      this.developerService.getDeveloper(this.id).subscribe(resp => {
        this.developer = resp;
        this.busy.next(false);
        this.load.next(true);
        this.isNewImage= false;
      });
    }
    else{
      this.isNewImage =true;
    this.busy.next(false);
    this.load.next(true);
  }
  }
  onFile(e: any) {
    this.isNewImage= true;
    this.Photo =e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL( e.target.files[0]);
    reader.onload = (_event : any) => {
      this.newImageUrl = _event.target.result;
    };

  }
  onSave(){
    this.busy.next(true);
    if( this.isvalidUpdate()){
      if(this.id == 0){
    this.developerService.createDeveloper({
      description: this.developer.description,
      descriptionInArabic: this.developer.descriptionInArabic,
      desplayOrder: this.developer.desplayOrder,
      name:this.developer.name,
      nameInArabic:this.developer.nameInArabic,
      picture: this.Photo,
      id:0,
      storageFileId:0
    }).subscribe(resp =>{
      const opts: any = {
        title: "Hooray!",
        text: `You have successfully created ${this.developer.name}'s information!`,
        icon: "success",
      };
      Swal.fire(opts).then((x) => {
        this.developer = resp;
        this.isNewImage = false;
        this.id = resp.id;
        this.busy.next(false);
      });},err =>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: err.error,
        }).then(x => {  this.busy.next(false);});
    });
  }
  else{
    this.developerService.updateDeveloper({
      description: this.developer.description,
      descriptionInArabic: this.developer.descriptionInArabic,
      desplayOrder: this.developer.desplayOrder,
      name:this.developer.name,
      nameInArabic:this.developer.nameInArabic,
      picture: this.Photo,
      id:this.id,
      storageFileId:this.developer.storageFileId
    }).subscribe(resp =>{
      const opts: any = {
        title: "Hooray!",
        text: `You have successfully Update ${this.developer.name}'s information!`,
        icon: "success",
      };
      Swal.fire(opts).then((x) => {
        this.developer = resp;
        this.isNewImage = false;
        this.id = resp.id;
        this.busy.next(false);
      });},err =>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: err.error,
        }).then(x => {  this.busy.next(false);});
    });
  }
  }}
  goBack(){
    this.router.navigate(["/developers"]);
  }
  ArabicDiscription(){
    if(this.developer.descriptionInArabic == ""){
      this.isArabicDiscription = false;
    }
    else{
      this.isArabicDiscription = true;
    }
  }
  EnglishDiscription(){
    if(this.developer.description == ""){
      this.isEnglishDiscription = false;
    }
    else{
      this.isEnglishDiscription = true;
    }
  }
  EnglishName(){   if(this.developer.name == ""){
    this.isEnglishName = false;
  }
  else{
    this.isEnglishName = true;
  }}
  ArabicName(){   if(this.developer.nameInArabic == ""){
    this.isArabicName = false;
  }
  else{
    this.isArabicName = true;
  }}

  isvalidUpdate(){
    const errors = [];
    if(this.developer.description == ""){
      errors.push("Description is required");
    }
    if(this.developer.name == ""){
      errors.push("Name in English is required");
    }
    if(this.developer.descriptionInArabic == ""){
      errors.push("Description is required");
    }
    if(this.developer.nameInArabic == ""){
      errors.push("Name In Arabic is required");
    }
    if(this.Photo == null && this.id ==0){
      errors.push("Photo  is required");
    }
    const a = errors.join("<br> ");
    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: a,
      }).then(x => {  this.busy.next(false);});
      return false;
    }
    return true;
  }
}
