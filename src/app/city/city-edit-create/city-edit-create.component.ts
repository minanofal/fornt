import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { City } from 'src/app/domain/City/city';
import Swal from 'sweetalert2';
import { CityService } from '../Service/city.service';

@Component({
  selector: 'app-city-edit-create',
  templateUrl: './city-edit-create.component.html',
  styleUrls: ['./city-edit-create.component.scss']
})
export class CityEditCreateComponent implements OnInit {
  id: number;
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEnglishName : boolean = true;
  isArabicName : boolean = true;
  city : City = {id:0, nameArabic:"", nameEnglish:"",displayoreder:999};
  constructor(private route: ActivatedRoute,private router: Router, private cityservice :CityService) { }
  EnglishName(){
    if(this.city.nameEnglish == ""){
      this.isEnglishName = false;
    }
    else{
      this.isEnglishName = true;
    }
  }
  ArabicName(){
    if(this.city.nameArabic == ""){
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
      this.cityservice.getCity(this.id).subscribe(x => {this.city = x; 
        console.log(x);
        this.busy.next(false);
        this.load.next(true);})    
    }
  }
  goBack(){
    this.router.navigate(["/cities"]);
  }
  onSave(){
    this.busy.next(true);
    if(this.isvalidsave()){
    if(this.id == 0){
      this.cityservice.CreateCity(this.city).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Create ${this.city.nameEnglish}`,
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
      this.cityservice.UpdateCity(this.city).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Update ${this.city.nameEnglish}`,
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
  }}

  isvalidsave(){
    const errors = [];
    if(this.city.nameArabic == ""){
      errors.push("Arabic Name is required");
    }
    if(this.city.nameEnglish == ""){
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
