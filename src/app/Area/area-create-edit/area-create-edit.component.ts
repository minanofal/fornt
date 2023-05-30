import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Area, AreaDetrail } from 'src/app/domain/Area/Area';
import { AreaService } from '../Service/area.service';
import Swal from 'sweetalert2';

import { CityService } from 'src/app/city/Service/city.service';
import { DropDown } from 'src/app/domain/DropDown/DropDown';

@Component({
  selector: 'app-area-create-edit',
  templateUrl: './area-create-edit.component.html',
  styleUrls: ['./area-create-edit.component.scss']
})
export class AreaCreateEditComponent implements OnInit {
  id: number;
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEnglishName : boolean = true;
  cities: DropDown[];
  isArabicName : boolean = true;
  isCity: boolean = true;
  Area : AreaDetrail = {id:0, nameArabic:"", nameEnglish:"",displayoreder:999, city: 0};
  constructor(private route: ActivatedRoute,
    private router: Router,
     private areaservice :AreaService,
     private cityService: CityService) { }
  EnglishName(){
    if(this.Area.nameEnglish == ""){
      this.isEnglishName = false;
    }
    else{
      this.isEnglishName = true;
    }
  }
  ArabicName(){
    if(this.Area.nameArabic == ""){
      this.isArabicName = false;
    }
    else{
      this.isArabicName = true;
    }
  }
  City(){
    if(this.Area.city == 0){
      this.isCity = false;
    }
    else{
      this.isCity = true;
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((x) => (this.id = x['id']));
    if(this.id ==0){
      this.cityService.DropDown().subscribe(
        x => {
          this.cities = x;
          this.busy.next(false);
          this.load.next(true);
        }
      )
 }
    else{
      this.areaservice.getArea(this.id).subscribe(x => {this.Area = x;
        this.cityService.DropDown().subscribe(
          x => {
            this.cities = x;
            this.busy.next(false);
            this.load.next(true);
          }
        )
    })    
    }
  }
  goBack(){
    this.router.navigate(["/areas"]);
  }
  onSave(){
    this.busy.next(true);
    if(this.isvalidsave()){
    if(this.id == 0){
      this.areaservice.CreateArea(this.Area).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Create ${this.Area.nameEnglish}`,
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
      this.areaservice.UpdateArea(this.Area).subscribe((data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Update ${this.Area.nameEnglish}`,
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
    if(this.Area.nameArabic == ""){
      errors.push("Arabic Name is required");
    }
    if(this.Area.nameEnglish == ""){
      errors.push("English Name is required");
    }

    if(this.Area.city == 0){
      errors.push("City is required");
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
