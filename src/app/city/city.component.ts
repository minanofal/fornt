import { Component, OnInit } from '@angular/core';
import { DataResult } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SearchCity } from '../domain/City/city';
import { CityService } from './Service/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  search : SearchCity ={ nameArabic : "", nameEnglish:""}
  gridView: DataResult;
  constructor(private cityservice : CityService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(){
    this.busy.next(false);
    this.isLoading.next(true);
    this.cityservice.getCities(this.search).subscribe(x => { this.gridView = { data: x, total: x.length };
      this.busy.next(true);
      this.isLoading.next(false);})
  }
  clearSearch(){
    this.search = { nameArabic : "", nameEnglish:""}
    this.loadItems();
  }
  onApplyFilters(){
    this.loadItems();
  }

}
