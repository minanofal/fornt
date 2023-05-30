import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { GridModule } from '@progress/kendo-angular-grid';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProjectCreateEditComponent } from "./project-create-edit/project-create-edit.component";
import { ProjectComponent } from "./project/project.component";
import { MaindataComponent } from "./project-create-edit/maindata/maindata.component";
import { ImagesComponent } from "./project-create-edit/images/images.component";
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {ViewEncapsulation} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
    declarations: [ProjectCreateEditComponent,ProjectComponent,MaindataComponent, ImagesComponent],
    imports: [
        MatIconModule,
        FormsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        CommonModule,
        GridModule,
        MatSelectModule,
        RouterModule,
        NgbModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatNativeDateModule,
        DragDropModule,
    ],
    exports: [
        ProjectCreateEditComponent,
      ],
})
export class ProjectModule {}