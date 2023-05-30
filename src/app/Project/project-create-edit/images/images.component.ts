import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { NewImage } from 'src/app/domain/Project/Project';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  modal: NgbModalRef;
  imageId : number = 0; 
  url :string;
  constructor( public projectService : ProjectService,
    private ngbModalService: NgbModal,) { }

  ngOnInit(): void {
  }
  open(){
    this.ngbModalService.open(ImageDialogComponent, {  windowClass: 'my-class' })
    .result.then( (x) => {
      if(x){
      // this.addimageview(x);
      }
    });
  }

  // addimageview(imgs : File[]){
  //   for(let i=0 ; imgs.length; i++){
  //   const reader = new FileReader();
  //   let result : string;
  //   reader.readAsDataURL( imgs[i]);
  //   reader.onload = (_event : any) => {
  //     this.projectService.newImages.value.push({id: this.imageId, image : imgs[i], url: _event.target.result});
  //     this.imageId = this.imageId -1;
  //   };
  // }
  // this.save();
  // }
  // save(){

  // }
  delete(id : number){
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to Delete this Image?",
      icon: "info",
      confirmButtonText: "OK",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((x) => {
      if(x.value){
     if(id >0 ){
      this.projectService.deletedImages.value.push(id);
      this.projectService.currentProject.value.images = this.projectService.currentProject.value.images.filter(x => x.id != id)
     }
     else{
     let img
       = this.projectService.newImages.value.filter(x => x.id != id);
       this.projectService.newImages=  new BehaviorSubject<NewImage[]>(img); 
     }
    }
  })
}
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.projectService.currentProject.value.images, event.previousIndex, event.currentIndex);
}
}
