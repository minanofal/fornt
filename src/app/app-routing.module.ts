import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GardService } from './Auth/Service/gard.service';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { UserCreateEditComponent } from './Auth/users/user-create-edit/user-create-edit.component';
import { UsersComponent } from './Auth/users/users.component';
import {  CategpryComponent } from './Category/categpry/categpry.component';
import { EditCreateCategoryComponent } from './Category/edit-create-category/edit-create-category.component';
import { CityEditCreateComponent } from './city/city-edit-create/city-edit-create.component';
import { CityComponent } from './city/city.component';
import { HomeComponent } from './home/home.component';
import { CommonComponent } from './Share/common/common.component';
import { TypesComponent } from './Type/types/types.component';
import { TypyCreateEditComponent } from './Type/typy-create-edit/typy-create-edit.component';
import { DeveloperComponent } from './Developer/developer/developer.component';
import { DeveloperCreateEditComponent } from './Developer/developer-create-edit/developer-create-edit.component';
import { ProjectComponent } from './Project/project/project.component';
import { ProjectCreateEditComponent } from './Project/project-create-edit/project-create-edit.component';
import { AreaComponent } from './Area/area/area.component';
import { AreaCreateEditComponent } from './Area/area-create-edit/area-create-edit.component';
import { NotFoundPageComponent } from './Share/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'login', component: SignInComponent },
  {path: "",
  component: CommonComponent,
  canActivate:[GardService] ,
  children: [{
     path:'',component: HomeComponent , 
  },
  {
    path:'users', component: UsersComponent
  },
  {
    path:'users/:id',  component: UserCreateEditComponent,
  },
  {
    path:'cities',  component: CityComponent
  },
  {
    path:'cities/:id',  component: CityEditCreateComponent
  },
  {
    path:'areas',  component: AreaComponent
  },
  {
    path:'areas/:id',  component: AreaCreateEditComponent
  },
  {
    path:'Categories',  component: CategpryComponent
  },
  {
    path:'Categories/:id',  component: EditCreateCategoryComponent
  },
  {
    path:'types',  component: TypesComponent
  },
  {
    path:'types/:id',  component: TypyCreateEditComponent
  },
  {
    path:'developers',  component: DeveloperComponent
  },
  {
    path:'developers/:id',  component: DeveloperCreateEditComponent
  },
  {
    path:'projects',  component: ProjectComponent
  },
  {
    path:'projects/:id',  component: ProjectCreateEditComponent
  },
]},
{
  path:'**',  component: NotFoundPageComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
