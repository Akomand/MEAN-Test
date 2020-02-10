import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';     // Used for client side routing

import { 
  MatToolbarModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule
} from '@angular/material';       // Toolbar from materials library

import { HttpClientModule } from '@angular/common/http';    // Import to inject HttpClient (a service) into Issue service
import { ReactiveFormsModule } from '@angular/forms';       // Needed to import form builder in create component

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';


import { IssueService } from './issue.service';   //Import Issue Service (after backend set up)


// Configure paths in array
const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent },    // id is needed for editing
  { path: '', redirectTo: 'list', pathMatch: 'full'}    // default route (pathMatch makes sure it is only empty string)
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,    // The imports below can be used in any of these component classes
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),      // activates routes
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [IssueService],  // Include IssueService in providers (services). Services can be injected.
  bootstrap: [AppComponent]
})
export class AppModule { }
