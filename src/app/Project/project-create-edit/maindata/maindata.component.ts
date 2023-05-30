import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DropDown } from 'src/app/domain/DropDown/DropDown';
import { Project } from 'src/app/domain/Project/Project';
import Swal from 'sweetalert2';
import { ProjectService } from '../../service/project.service';
import { DeveloperService } from 'src/app/Developer/developer.service';
import { AreaService } from 'src/app/Area/Service/area.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/utils';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-maindata',
  templateUrl: './maindata.component.html',
  styleUrls: ['./maindata.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MaindataComponent implements OnInit {
  date = new FormControl(moment()); 
  video: string;
  id: number;
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  developers: DropDown[];
  areas: DropDown[];
  url: string;
  isEnglishName : boolean = true;
  isArabicName : boolean = true;
  isArabicDiscription :boolean =true;
  isEnglishDiscription :boolean =true;
  isNewImage: boolean ;
  Photo : File;
  newImageUrl: string = "../../../assets/Iamges/image.jpg";

  constructor(private developerService: DeveloperService,
     private route: ActivatedRoute,
     private areaService: AreaService,
     public projectService : ProjectService,
     private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((x) => (this.id = x['id']));
    this.busy.next(false);
    this.load.next(false);
    if(this.id !=0 ){
      this.projectService.currentProject.subscribe(y =>{
      this.url=y.videoUrl;
      const ctrlValue = this.date.value!;
      console.log(y.deleveryDate)
      let d =moment(y.deleveryDate);
      ctrlValue.month(d.month());
      ctrlValue.year(d.year());
      this.date.setValue(ctrlValue);
      this.developerService.DropDown().subscribe(resp => {
        this.developers =resp;
        this.areaService.DropDown().subscribe(z =>{
        this.areas = z;
        this.isNewImage =false;
        this.busy.next(false);
        this.load.next(true);
        })
          });
        })
    }
    else{
      this.developerService.DropDown().subscribe(resp => {
    this.developers =resp;
    this.areaService.DropDown().subscribe(z =>{
      this.areas = z;
    this.isNewImage =true;
    this.busy.next(false);
    this.load.next(true);
    })
      })
  }
  }
  onFile(e: any) {
    this.isNewImage= true;
    this.Photo =e.target.files[0];
    if(this.projectService.newMainImage){
      this.projectService.newMainImage.next(this.Photo);
    }
    else{
      this.projectService.newMainImage = new BehaviorSubject<File>(this.Photo);
    }
    const reader = new FileReader();
    reader.readAsDataURL( e.target.files[0]);
    reader.onload = (_event : any) => {
      this.newImageUrl = _event.target.result;
    };

  }
 

  ArabicDiscription(){
    if(this.projectService.currentProject.value.descriptionInArabic == ""){
      this.isArabicDiscription = false;
    }
    else{
      this.isArabicDiscription = true;
    }
  }
  EnglishDiscription(){
    if(this.projectService.currentProject.value.description == ""){
      this.isEnglishDiscription = false;
    }
    else{
      this.isEnglishDiscription = true;
    }
  }
  EnglishName(){   if(this.projectService.currentProject.value.name == ""){
    this.isEnglishName = false;
  }
  else{
    this.isEnglishName = true;
  }}
  ArabicName(){   if(this.projectService.currentProject.value.nameInArabic == ""){
    this.isArabicName = false;
  }
  else{
    this.isArabicName = true;
  }}
  Url(){
    if(this.url.includes("=")&& !this.url.includes("https://www.youtube.com/embed/")){
    const id =  this.url.split("=");
    this.video = "https://www.youtube.com/embed/"+ id[1];
    this.projectService.currentProject.value.videoUrl= this.video;
    console.log( this.projectService.currentProject.value.videoUrl);
    }
    if(this.url==""){
      this.projectService.currentProject.value.videoUrl= "";
    }
  }
  VideoURL() {
    
   return this.sanitizer.bypassSecurityTrustResourceUrl(this.projectService.currentProject.value.videoUrl);
  }
    setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    normalizedMonthAndYear.toDate()
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.projectService.currentProject.value.deleveryDate= normalizedMonthAndYear.toDate().toISOString();
    datepicker.close(); 
  }
}
