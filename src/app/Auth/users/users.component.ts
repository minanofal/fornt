import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataResult, State } from '@progress/kendo-data-query';
import { Auth, RolesdropDown, SearchUsers } from 'src/app/domain/Auth';
import { AuthService } from '../Service/auth.service';
import { UserLit } from 'src/app/domain/User';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  roles: RolesdropDown[];
  selectedRole: string;
  firstName: string;
  lastName: string;
  email: string;
  gridView: DataResult;
  maxTextLength = 60;
  loaded: boolean = true;
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
  search: SearchUsers = {
    email: '',
    firstName: '',
    lastName: '',
    roleId: '',
    pageIndex: 1,
    skip: this.state.skip!,
    take: this.state.take!,
  };
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.busy.next(false);
    this.isLoading.next(true);
    this.loadItems();
  }
  clearSearch() {
    this.selectedRole = "";
    this.state = {
      take: 30,
      skip: 0,
      sort: [
        {
          field: 'createdOnUtc',
          dir: 'desc',
        },
      ],
    };
    this.search = {
      roleId: '',
      email: '',
      firstName: '',
      lastName: '',
      pageIndex: 1,
      skip: this.state.skip!,
      take: this.state.take!,
    };
    this.loadItems();
  }
  loadItems() {
    this.authService
      .getUsers({
        email: this.search.email,
        firstName: this.search.firstName,
        lastName: this.search.lastName,
        pageIndex: this.state.skip! / this.state.take!,
        skip: this.state.skip!,
        take: this.state.take!,
        roleId: this.selectedRole,
      })
      .subscribe((x) => {
        this.gridView = { data: x.items, total: x.totalCount };
        this.authService.getRoles().subscribe((x) => {
          this.roles = x;
          this.busy.next(true);
          this.isLoading.next(false);
        });
      });
  }
  onApplyFilters() {
    this.busy.next(false);
    this.isLoading.next(true);
    this.loadItems();
  }
  dataStateChange(state: DataStateChangeEvent) {
    this.state = state;
    this.loadItems();
  }
}
