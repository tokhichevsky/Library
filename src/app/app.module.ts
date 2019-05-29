import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  
    MatIconModule, MatInputModule,
    MatAutocompleteModule, MatChipsModule,
    MatFormFieldModule
  
  
  } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeRenderComponent } from './tree-render/tree-render.component';
import { TreeService } from './tree.service';
import { AboutNodeComponent } from './about-node/about-node.component';
import { SearchComponent } from './search/search.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddFormComponent } from './add-form/add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeRenderComponent,
    AboutNodeComponent,
    SearchComponent,
    LoginFormComponent,
    AddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  providers: [TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
