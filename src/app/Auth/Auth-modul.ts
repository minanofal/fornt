import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { UsersComponent } from "./users/users.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { GridModule } from '@progress/kendo-angular-grid';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from "@angular/router";
import { UserCreateEditComponent } from "./users/user-create-edit/user-create-edit.component";

@NgModule({
    declarations: [SignInComponent, UsersComponent, UserCreateEditComponent],
    imports: [
        MatIconModule,
        FormsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        CommonModule,
        GridModule,
        MatSelectModule,
        RouterModule,
        NgbModule
    ]
})
export class AuthModule {}