import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileDropZoneComponent } from './shared/file-drop-zone/file-drop-zone.component';
import { UploadImageFormComponent } from './upload-image-form/upload-image-form.component';

import { ClassifierService } from './core/services/classifier.service';
import { FileDropDirective } from './core/directives/file-drop.directive';
@NgModule({
  declarations: [
    AppComponent,
    FileDropZoneComponent,
    FileDropDirective,
    UploadImageFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'uploadimage',
        component: UploadImageFormComponent
      },
      {
        path: '',
        redirectTo: '/uploadimage',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    ClassifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
