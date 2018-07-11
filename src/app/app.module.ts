import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FileDropZoneComponent } from './shared/file-drop-zone/file-drop-zone.component';
import { UploadImageFormComponent } from './upload-image-form/upload-image-form.component';

import { ClassifierService } from './core/services/classifier.service';
import { DataService } from './core/services/data.service';
import { FileDropDirective } from './core/directives/file-drop.directive';
import { ClassifierResultFormComponent } from './classifier-result-form/classifier-result-form.component';
@NgModule({
  declarations: [
    AppComponent,
    FileDropZoneComponent,
    FileDropDirective,
    UploadImageFormComponent,
    ClassifierResultFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'uploadimage',
        component: UploadImageFormComponent
      },
      {
        path: '',
        redirectTo: '/uploadimage',
        pathMatch: 'full'
      },
      {
        path: 'imageresult',
        component: ClassifierResultFormComponent
      }
    ])
  ],
  providers: [
    ClassifierService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
