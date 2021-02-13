import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from'@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { CarServiceService } from './services/car-service.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import {Routes ,RouterModule} from '@angular/router';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserServiceService } from './services/user-service.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';


const appRoutes: Routes=[
  {path: '', component:PropertyListComponent},
  {path: 'rent-property', component:PropertyListComponent},
  {path: 'add-property', component:AddPropertyComponent},
  {path: 'property-detail/:id', component:PropertyDetailComponent, resolve:{prp:PropertyDetailResolverService}},
  {path: 'user/login', component:UserLoginComponent},
  {path: 'user/register', component:UserRegisterComponent},
  {path: '**', component:PropertyListComponent},


]
@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      PropertyCardComponent,
      PropertyListComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      UserLoginComponent,
      UserRegisterComponent,
      FilterPipe,
      SortPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [CarServiceService,UserServiceService,AlertifyService,AuthService,PropertyDetailResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
