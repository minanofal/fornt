import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import{AuthModule} from '../app/Auth/Auth-modul';
import { JwtModule } from '@auth0/angular-jwt';
import { GardService } from './Auth/Service/gard.service';
import { CommonModule } from '@angular/common';
import{ HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './Share/footer/footer.component';
import { CommonComponent } from './Share/common/common.component';
import { SideNavComponent } from './Share/side-nav/side-nav.component';
import { HaderComponent } from './Share/hader/hader.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GridModule } from '@progress/kendo-angular-grid';
import {CityModule} from'../app/city/city-modul';
import {CategoryModule} from'../app/Category/Category-model';
import { TypeModule } from './Type/Type-model';
import { DeveloperModule } from './Developer/developer-modul';
import { ProjectModule } from './Project/project.modul';
import { AreaModule } from './Area/Area.module';
import { ImageDialogComponent } from './Project/project-create-edit/images/image-dialog/image-dialog.component';
import { NotFoundPageComponent } from './Share/not-found-page/not-found-page.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


export function tokenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    CommonComponent,
    SideNavComponent,
    HaderComponent,
    ImageDialogComponent,
    NotFoundPageComponent,
    
  ],
  imports: [
    DeveloperModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule,
    AuthModule,
    CityModule,
    FormsModule,
    CommonModule,
    CategoryModule,
    AreaModule,
    ProjectModule,
    TypeModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule ,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config:{
        tokenGetter : tokenGetter,
        allowedDomains : ["https://localhost:7215/"],
        disallowedRoutes : []
      }
    }),
    GridModule,
  ],
  providers: [GardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
