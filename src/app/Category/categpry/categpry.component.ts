import { Component, OnInit } from '@angular/core';
import { DataResult } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CategorySearch } from 'src/app/domain/Category/category';
import { CatgoriesService } from '../service/catgories.service';

@Component({
  selector: 'app-categpry',
  templateUrl: './categpry.component.html',
  styleUrls: ['./categpry.component.scss']
})
export class CategpryComponent implements OnInit {
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  search : CategorySearch={ name : "", nameInArabic:""}
  gridView: DataResult;
  constructor(private categoryservice: CatgoriesService) { }

  ngOnInit(): void {
    this.loadItems();
  }
  loadItems(){
    this.busy.next(false);
    this.isLoading.next(true);
    this.categoryservice.getCategories(this.search).subscribe(x => { this.gridView = { data: x, total: x.length };
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
