import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:FileDropZoneComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting:FileDropZoneComponent,
      multi: true
    }
  ]
})
export class FileDropZoneComponent implements ControlValueAccessor, Validator {
  selectedImage: File;
  dropzoneActive: boolean = false

  private onChange: (value: File) => void;

  constructor() { }

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  handleDrop(fileList: FileList) {
    this.selectedImage = fileList.item(0);
    this.onChange(this.selectedImage);
  }

  writeValue(value: File): void {
    this.selectedImage = value;
  }

  registerOnChange(onChange: (value: File) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {  }

  validate() {
    if(!this.selectedImage){
      return { required: 'This image is required' };
    }
    return null;
  }

}
