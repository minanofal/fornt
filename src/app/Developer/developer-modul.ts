import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { GridModule } from '@progress/kendo-angular-grid';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from "@angular/router";
import { DeveloperComponent } from "./developer/developer.component";
import { DeveloperCreateEditComponent } from "./developer-create-edit/developer-create-edit.component";

import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
    declarations: [DeveloperComponent, DeveloperCreateEditComponent],
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
        MatCheckboxModule
    ]
})
export class DeveloperModule {}