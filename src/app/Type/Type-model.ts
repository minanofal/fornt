import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { GridModule } from '@progress/kendo-angular-grid';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from "@angular/router";
import { TypesComponent } from "./types/types.component";
import { TypyCreateEditComponent } from "./typy-create-edit/typy-create-edit.component";
@NgModule({
    declarations: [TypesComponent,  TypyCreateEditComponent ],
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
export class TypeModule {}