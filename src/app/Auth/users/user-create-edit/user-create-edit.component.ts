import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RolesdropDown, UserRegister } from 'src/app/domain/Auth';
import { AuthService } from '../../Service/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {
  id: string;
  email : string = '';
  isvalidPassword : boolean= true;
  user: UserRegister = {
    id:"",
    email:"",
    firstName:"",
    userName:"",
    lastName:"",
    password:"",
    phoneNumber:"",
    roleId:""
  }
  isonfirmPassword: boolean= true;
  isPhone: boolean = true;
  islastname: boolean = true;
  isfirstname: boolean = true;
  isemail: boolean =true;
  isrole: boolean = true;
  roles: RolesdropDown[];
  busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  confermPassword : string;

  constructor(private route: ActivatedRoute, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((x) => (this.id = x['id']));
    if(this.id  == 'new'){
    this.authService.getRoles().subscribe((x) => {
      this.roles = x;
      this.busy.next(false);
      this.load.next(true);
    });}
    else{
      this.authService.getDetail(this.id).subscribe(x=>{
        this.user = x;
        this.authService.getRoles().subscribe((x) => {
          this.roles = x;
          this.busy.next(false);
          this.load.next(true);
        });})
    }
  }

role(){
  if(this.user.roleId == ""){
    this.isrole =false;
  }
  else{
    this.isrole = true;
  }
}
  Email(){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
     this.isemail= validRegex.test(this.user.email);
  }
  FirstName(){
    if(this.user.firstName == ""){
      this.isfirstname = false;
    }
    else{
      this.isfirstname = true;
    }
  }
  LastName(){
    if(this.user.lastName == ""){
      this.islastname = false;
    }
    else{
      this.islastname =  true;
    }
  }
  phone(){
    this.user.phoneNumber= this.user.phoneNumber.toString();
    if(this.user.phoneNumber == ""){
      this.isPhone = false;
    }
    else{
      this.isPhone  =  true;
    }
  }
  Password(){
    var exactMatch = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    this.isvalidPassword = exactMatch.test(this.user.password);
  }
  ConfirmPassword(){
    
    if(this.user.password== this.confermPassword) {
      this.isonfirmPassword = true
    }
    else{this.isonfirmPassword = false}
  }

  
  onSave(){
    this.busy.next(true);
    if(this.id == 'new'){
      if(this.isvalidRegister()){
    this.authService.Rgister(this.user).subscribe(
      (data) => {
        const opts: any = {
          title: "Hooray!",
          text: `You have successfully Create ${this.user.firstName}'s Account!`,
          icon: "success",
        };
        Swal.fire(opts).then((x) => {
          this.busy.next(false);
          this.goBack();
        });
      }, (error) =>{
        console.log(error);
        const opts: any = {
        title: "Error!",
        text: `${error.error}`,
        icon: "error",
      };
      Swal.fire(opts).then((x) => {
        this.busy.next(false);
      });
    })}
    }
    else{
      this.authService.UpdateUser(this.user).subscribe(
        (data) => {
          const opts: any = {
            title: "Hooray!",
            text: `You have successfully updated ${this.user.firstName}'s information!`,
            icon: "success",
          };
          Swal.fire(opts).then((x) => {
            this.busy.next(false);
            this.goBack();
          });
        }, (error) =>{
          const opts: any = {
          title: "Error!",
          text: `${error.error}`,
          icon: "error",
        };
        Swal.fire(opts).then((x) => {
          this.busy.next(false);
        });
      })
      }
  }
  goBack(){
    this.router.navigate(["/users"]);
  }
  isvalidRegister(){
    const errors = [];
    if(this.user.firstName == ""){
      errors.push("FirstName is required");
    }
    if(this.user.lastName == ""){
      errors.push("LastName is required");
    }
    if(this.user.roleId == ""){
      errors.push("Role is required");
    }
    if(this.user.email == ""){
      errors.push("Email is required");
    }
    if(this.user.password == ""){
      errors.push("Password is required");
    }
    if(this.user.password !=  this.confermPassword){
      errors.push("Password not match");
    }
    const a = errors.join("<br> ");
    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: a,
      }).then(x => {  this.busy.next(false);});
      return false;
    }
    return true;
  }
  isvalidUpdate(){
    const errors = [];
    if(this.user.firstName == ""){
      errors.push("FirstName is required");
    }
    if(this.user.lastName == ""){
      errors.push("LastName is required");
    }
    if(this.user.roleId == ""){
      errors.push("Role is required");
    }
    if(this.user.email == ""){
      errors.push("Email is required");
    }
    if(this.user.password !=  this.confermPassword){
      errors.push("Password not match");
    }
    const a = errors.join("<br> ");
    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: a,
      }).then(x => {  this.busy.next(false);});
      return false;
    }
    return true;
  }
}


