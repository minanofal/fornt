import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DataResult, State } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs';
import { AreaService } from 'src/app/Area/Service/area.service';
import { DeveloperService } from 'src/app/Developer/developer.service';
import { CityService } from 'src/app/city/Service/city.service';
import { DropDown } from 'src/app/domain/DropDown/DropDown';
import { SearchProject } from 'src/app/domain/Project/Project';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  cities: DropDown[];
  areas: DropDown[];
  developers: DropDown[];
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  state: State = {
    take: 30,
    skip: 0,
    sort: [
      {
        field: 'createdOnUtc',
        dir: 'desc',
      },
    ],
  };
  search : SearchProject ={areaId : 0, cityId:0, developerId:0, name:"", nameInArabic:"",pageIndex: 1,
  skip: this.state.skip!,
  take: this.state.take!,};
  gridView: DataResult;
  constructor(private cityService: CityService,
    private developerService: DeveloperService,
    private areaService : AreaService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.cityService.DropDown().subscribe( x => {
      this.cities = x;
      this.developerService.DropDown().subscribe(y => {
        this.developers = y;
        this.areaService.DropDown().subscribe(z =>{
          this.areas = z;
          this.loadItems();
        })
      })
  })
  }
  loadItems(){
    this.projectService.getProjectsLite({
      areaId : this.search.areaId,
      cityId: this.search.cityId,
      developerId: this.search.developerId,
      name: this.search.name,
      nameInArabic: this.search.nameInArabic,
      pageIndex: this.state.skip! / this.state.take!,
      skip: this.state.skip!,
      take: this.state.take!,
    }).subscribe(x => {
      this.gridView = {data : x.items, total : x.totalCount};
      this.busy.next(true);
      this.isLoading.next(false);
    },
    err => {
      console.log(err);

    }
    )
  }
  clearSearch(){
    this.search = {
      name:'',
      areaId:0,
      cityId:0,
      developerId:0,
      nameInArabic:'',
      pageIndex: 1,
      skip: this.state.skip!,
      take: this.state.take!,
        }
        this.loadItems();
  }
  dataStateChange(state: DataStateChangeEvent) {
    this.state = state;
    this.loadItems();
  }
}
