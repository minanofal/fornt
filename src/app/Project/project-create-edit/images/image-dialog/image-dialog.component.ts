import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/Project/service/project.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {
  newImageUrl: string = "../../../assets/Iamges/image.jpg";
  newImages: string[] = [];
  Photo: File[];
  constructor(
    public activeModal: NgbActiveModal,
    public projectService : ProjectService
  ) { }

  ngOnInit(): void {

  }
  onFile(e: any) {
    this.Photo =e.target.files;
 
    for(let i =0 ; i < e.target.files.length; i++ ){
      var reader = new FileReader();
    reader.readAsDataURL( e.target.files[i]);
    reader.onload = (_event : any) => {
      console.log(i);
      this.newImages.push( _event.target.result);
    };
  }
}

  add(){
    this.projectService.addImages(this.projectService.currentProject.value.id, this.Photo).subscribe(x =>{
      this.projectService.currentProject.value.images = x;
      return this.Photo;
    })
    
  }
 
}
