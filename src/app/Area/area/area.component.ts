import { Component, OnInit } from '@angular/core';
import { DataResult } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs';
import { SearchArea } from 'src/app/domain/Area/Area';
import { AreaService } from '../Service/area.service';
import { CityService } from 'src/app/city/Service/city.service';
import { DropDown } from 'src/app/domain/DropDown/DropDown';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  search : SearchArea ={ nameArabic : "", nameEnglish:"", cityId: 0}
  selectedCity: number;
  cities : DropDown[];
  gridView: DataResult;
  constructor(private areaservice : AreaService, private cityService : CityService) { }

  ngOnInit(): void {
    this.cityService.DropDown().subscribe(x => {
      
      this.cities = x;
      this.loadItems();
    });
    
  }

  loadItems(){
    this.busy.next(false);
    this.isLoading.next(true);
    this.areaservice.getAreas(this.search).subscribe(x => { this.gridView = { data: x, total: x.length };
      this.busy.next(true);
      this.isLoading.next(false);})
  }
  clearSearch(){
    this.search = { nameArabic : "", nameEnglish:"", cityId:0}
    this.loadItems();
  }
  onApplyFilters(){
    this.loadItems();
  }

}
