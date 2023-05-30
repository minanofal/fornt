import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit } from '@angular/core';
import { MaindataComponent } from './maindata/maindata.component';
import { ImagesComponent } from './images/images.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CreateProject, Project } from 'src/app/domain/Project/Project';
import { ProjectService } from '../service/project.service';
import { DropDown } from 'src/app/domain/DropDown/DropDown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-create-edit',
  templateUrl: './project-create-edit.component.html',
  styleUrls: ['./project-create-edit.component.scss']
})
export class ProjectCreateEditComponent implements OnInit {
  step = 1;
 id: number;

  componentReferences: ComponentRef<any>[] = [];
  createProject: CreateProject;
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  default : any  = MaindataComponent;
  project: Project ={
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
    deleveryDate : new Date().toString()
  }
  expectedComponentsInOrder = [
    { name: "Main", component: MaindataComponent },
    { name: "Images", component: ImagesComponent },
  ];
  maxTab = this.expectedComponentsInOrder.length;
  constructor( private route: ActivatedRoute,private router: Router, public projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((x) => (this.id = +x['id']));
    if(this.id ==0){
      this.projectService.currentProject.next(this.project);
    }
    else{
      this.projectService.getProject(this.id);
    }
    this.busy.next(false)
  }
  loadComponent(i: number) {
    this.default = this.expectedComponentsInOrder[i-1].component;
  }

  Active(id: number) {
    if (this.step === id) {
      return "active";
    }
    return;
  }
  onSave(){
    console.log(this.projectService.newImages.value);
    if(this.isvalidUpdate()){

      this.busy.next(true);
    this.createProject = {
       areaId : this.projectService.currentProject.value.areaId,
       description: this.projectService.currentProject.value.description,
       descriptionInArabic: this.projectService.currentProject.value.descriptionInArabic,
       developerId: this.projectService.currentProject.value.developerId,
       id: this.projectService.currentProject.value.id,
       loacationUrl: this.projectService.currentProject.value.loacationUrl,
       name: this.projectService.currentProject.value.name,
       nameInArabic: this.projectService.currentProject.value.nameInArabic,
       VideoUrl: this.projectService.currentProject.value.videoUrl,
       displayOrder: this.projectService.currentProject.value.displayOrder,
       deleveryDate :this.projectService.currentProject.value.deleveryDate
    }
    if(this.id == 0){
      this.projectService.createProject(this.createProject).subscribe( y =>{
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully created ${this.projectService.currentProject.value.name}'s information!`,
          icon: "success",
        };
        Swal.fire(opts).then((x) => {
          this.router.navigate(["/projects/"+y.id]).then(() => {
            window.location.reload();
          });
          this.busy.next(false);
        });},err =>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: err.error,
          }).then(x => {  this.busy.next(false);});
      })
    }
    else{
      this.projectService.Update(this.createProject).subscribe( y =>{
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully update ${this.projectService.currentProject.value.name}'s information!`,
          icon: "success",
        };
        Swal.fire(opts).then((x) => {
          this.router.navigate(["/projects/"+y.id]).then(() => {
            window.location.reload();
          });
          this.busy.next(false);
        });},err =>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: err.error,
          }).then(x => {  this.busy.next(false);});
      })
    }
  }
  }
  goBack(){
    this.router.navigate(["/projects"]);
  }
  isvalidUpdate(){
    const errors = [];
    if(this.projectService.currentProject.value.description == ""){
      errors.push("Description is required");
    }
    if(this.projectService.currentProject.value.name == ""){
      errors.push("Name in English is required");
    }
    if(this.projectService.currentProject.value.descriptionInArabic == ""){
      errors.push("Description is required");
    }
    if(this.projectService.currentProject.value.nameInArabic == ""){
      errors.push("Name In Arabic is required");
    }
    if(!this.projectService.newMainImage && this.id ==0){
      errors.push("Photo  is required");
    }
    // if(this.projectService.currentProject.value.loacationUrl == ""){
    //   errors.push("Location is required");
    // }
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
  publish(){

      Swal.fire({
        title: "Confirm",
        text: "Are you sure you want to Publish this Project?",
        icon: "info",
        confirmButtonText: "OK",
        showConfirmButton: true,
        showCancelButton: true,
      }).then((x) => {
        if(x.value){
          this.projectService.publish(this.projectService.currentProject.value.id).subscribe(x =>{

         const opts: any = {
          title: "Hooray!",
          text: `You have successfully Publish ${this.projectService.currentProject.value.name} !`,
          icon: "success",
        };
        Swal.fire(opts).then((x) => {
          this.router.navigate(["/projects/"+this.projectService.currentProject.value.id]).then(() => {
            window.location.reload();
          });
          this.busy.next(false);
        });},err =>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: err.error,
          }).then(x => {  this.busy.next(false);});
      })
        }});
       
  }
}

