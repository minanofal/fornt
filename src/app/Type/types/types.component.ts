import { Component, OnInit } from '@angular/core';
import { DataResult } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs';
import { TypeSearch } from 'src/app/domain/Type/type';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  search : TypeSearch={ name : "", nameInArabic:""}
  gridView: DataResult;
  constructor(private Typeservice: TypeService) { }

  ngOnInit(): void {
    this.loadItems();
  }
  loadItems(){
    this.busy.next(false);
    this.isLoading.next(true);
    this.Typeservice.getCategories(this.search).subscribe(x => { this.gridView = { data: x, total: x.length };
      console.log(x);
      this.busy.next(true);
      this.isLoading.next(false);})
  }
  clearSearch(){
    this.search ={ name : "", nameInArabic:""}
    this.loadItems();
  }
  onApplyFilters(){
    this.loadItems();
  }

}
