import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { TypeService } from '../type.service';
import { Type } from 'src/app/domain/Type/type';

@Component({
  selector: 'app-typy-create-edit',
  templateUrl: './typy-create-edit.component.html',
  styleUrls: ['./typy-create-edit.component.scss']
})
export class TypyCreateEditComponent implements OnInit {

  id: number;
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEnglishName : boolean = true;
  isArabicName : boolean = true;
  type : Type = {id:0, name:"", nameInArabic:"",displayOrder:999};
  constructor(private route: ActivatedRoute,private router: Router, private TypeService :TypeService) { }
  EnglishName(){
    if(this.type.name == ""){
      this.isEnglishName = false;
    }
    else{
      this.isEnglishName = true;
    }
  }
  ArabicName(){
    if(this.type.nameInArabic == ""){
      this.isArabicName = false;
    }
    else{
      this.isArabicName = true;
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((x) => (this.id = x['id']));
    if(this.id ==0){
    this.busy.next(false);
    this.load.next(true);}
    else{
      this.TypeService.getType(this.id).subscribe(x => {this.type = x; 
        this.busy.next(false);
        this.load.next(true);})    
    }
  }
  goBack(){
    this.router.navigate(["/types"]);
  }
  onSave(){
    this.busy.next(true);
    if(this.isvalidsave()){
    if(this.id == 0){
      this.TypeService.CreateType(this.type).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Create ${this.type.name}`,
          icon: "success",
        };
        Swal.fire(opts).then((x) => {
          this.busy.next(false);

          this.goBack();
        });
      }, (error) =>{
        const opts: any = {
        title: "Error!",
        text: `${error.error}`,
        icon: "error",
      };
      Swal.fire(opts).then((x) => {
        this.busy.next(false);
  
      });
    })
    }
    else{
      this.TypeService.updateType(this.type).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Update ${this.type.name}`,
          icon: "success",
        };
        Swal.fire(opts).then((x) => {
          this.busy.next(false);

          this.goBack();
        });
      }, (error) =>{
        const opts: any = {
        title: "Error!",
        text: `${error.error}`,
        icon: "error",
      };
      Swal.fire(opts).then((x) => {
        this.busy.next(false);
  
      });
    })
    }
  }
  }
  isvalidsave(){
    const errors = [];
    if(this.type.nameInArabic == ""){
      errors.push("Arabic Name is required");
    }
    if(this.type.name == ""){
      errors.push("English Name is required");
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
