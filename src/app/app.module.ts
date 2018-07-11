import { HttpClientModule } from '@angular/common/http';
import { ClassifierService } from './core/services/classifier.service';
import { FileDropDirective } from './core/directives/file-drop.directive';
import { FileDropZoneComponent } from './shared/file-drop-zone/file-drop-zone.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FileDropZoneComponent,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ClassifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
