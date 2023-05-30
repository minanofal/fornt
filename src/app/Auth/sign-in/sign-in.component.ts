import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { login } from 'src/app/domain/Login-user';
import { AuthService } from '../Service/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: login = { email : '', password: ''};
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error!: string | undefined;
  state: Observable<any> ;
  constructor( private authService : AuthService,private router : Router) { }
  form = new FormGroup ({
    email : new FormControl('',Validators.compose([Validators.required,Validators.email])),
    password :  new FormControl('',Validators.required)

  });

  get Email(){
    return this.form.get('email');
  }
  get Password(){
    return this.form.get('password');
  }
  ngOnInit(): void {
    this.busy.next(false)
  }
  signin() {
    this.busy.next(true);
    this.authService.Login(this.user).subscribe(resp => {
      this.authService.currentUser = resp;
      const token = (<any>resp).token;
      const role = (<any>resp).roles;
      localStorage.setItem("jwt",token);
      localStorage.setItem("roles",role);
      localStorage.setItem("id",resp.id)
      localStorage.setItem("firstName",resp.firstName)
      localStorage.setItem("lastName",resp.lastName)
      this.router.navigate(['/']);
      this.busy.next(false);
    } ,err => {this.error = "Invalid email and/or password, please try again";  this.busy.next(false);});
  }
}
