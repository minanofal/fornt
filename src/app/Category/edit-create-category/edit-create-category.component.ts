import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/domain/Category/category';
import Swal from 'sweetalert2';
import { CatgoriesService } from '../service/catgories.service';

@Component({
  selector: 'app-edit-create-category',
  templateUrl: './edit-create-category.component.html',
  styleUrls: ['./edit-create-category.component.scss']
})
export class EditCreateCategoryComponent implements OnInit {
  id: number;
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEnglishName : boolean = true;
  isArabicName : boolean = true;
  category : Category = {id:0, name:"", nameInArabic:"",displayOrder:999};
  constructor(private route: ActivatedRoute,private router: Router, private categoryService :CatgoriesService) { }
  EnglishName(){
    if(this.category.name == ""){
      this.isEnglishName = false;
    }
    else{
      this.isEnglishName = true;
    }
  }
  ArabicName(){
    if(this.category.nameInArabic == ""){
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
      this.categoryService.getCategory(this.id).subscribe(x => {this.category = x; 
        this.busy.next(false);
        this.load.next(true);})    
    }
  }
  goBack(){
    this.router.navigate(["/Categories"]);
  }
  onSave(){
    this.busy.next(true);
    if(this.isvalidsave()){
    if(this.id == 0){
      this.categoryService.CreateCategory(this.category).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Create ${this.category.name}`,
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
      this.categoryService.updateCategory(this.category).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Update ${this.category.name}`,
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
    if(this.category.nameInArabic == ""){
      errors.push("Arabic Name is required");
    }
    if(this.category.name == ""){
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

