import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/Service/auth.service';
import { Auth } from 'src/app/domain/Auth';

@Component({
  selector: 'app-hader',
  templateUrl: './hader.component.html',
  styleUrls: ['./hader.component.scss']
})
export class HaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, public authService: AuthService) {}
  firstName : string;
  lastName : string;
  ngOnInit(): void {
    this.firstName = localStorage.getItem("firstName")!;
    this.lastName = localStorage.getItem("lastName")!;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("roles");
    this.router.navigate(['login']);
  }

}
