import { Component, OnInit } from '@angular/core';
import { DataResult, State } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs';
import { SearchDeveloper } from 'src/app/domain/Developer/developer';
import { DeveloperService } from '../developer.service';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
  search : SearchDeveloper = {
name:'',
nameInArabic:'',
pageIndex: 1,
skip: this.state.skip!,
take: this.state.take!,
  }
  gridView: DataResult;

  constructor(private developerSercie: DeveloperService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(){
    this.busy.next(false);
    this.isLoading.next(true);
    this.developerSercie.getDeveloperLite(
      { name: this.search.name,
        nameInArabic: this.search.nameInArabic,
        pageIndex: this.state.skip! / this.state.take!,
        skip: this.state.skip!,
        take: this.state.take!,
      }
    ).subscribe(resp => {
      this.gridView = { data: resp.items, total: resp.totalCount };
      this.busy.next(true);
      this.isLoading.next(false);
    })
  }
  clearSearch(){
    this.search = {
      name:'',
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
