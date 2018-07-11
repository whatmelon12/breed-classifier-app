import { ClassifierService } from './../../core/services/classifier.service';
import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss']
})
export class FileDropZoneComponent {
  selectedImage: File;
  dropzoneActive: boolean = false

  constructor(private service: ClassifierService) { }

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  handleDrop(fileList: FileList) {
    this.selectedImage = fileList.item(0);
    let formData: FormData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);

    this.service.testImageFile(formData)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          console.log('Uploaded Progress: ' + (event.loaded / event.total) * 100);
        }else if(event.type === HttpEventType.Response){
          console.log(event);
        }
      });
  }

}
