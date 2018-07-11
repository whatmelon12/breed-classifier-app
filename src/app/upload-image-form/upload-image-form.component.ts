import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

import { BreedScore } from './../core/model/breed.model';

import { ClassifierService } from './../core/services/classifier.service';

@Component({
  selector: 'upload-image-form',
  templateUrl: './upload-image-form.component.html',
  styleUrls: ['./upload-image-form.component.scss']
})
export class UploadImageFormComponent implements OnInit {
  form: FormGroup;
  showResult: boolean = false;
  breedScore: BreedScore[];

  constructor(private fb: FormBuilder,
    private service: ClassifierService) { }

  ngOnInit() {
    this.form = this.fb.group({
      image: []
    });

    this.form.get('image').valueChanges
      .subscribe(file => {
        let formData: FormData = new FormData();
        formData.append('image', file, file.name);

        this.service.testImageFile(formData)
          .subscribe(event => {
            if(event.type === HttpEventType.UploadProgress){
              console.log('Uploaded Progress: ' + (event.loaded / event.total) * 100);
            }else if(event.type === HttpEventType.Response){
              this.breedScore = event.body as BreedScore[];
              console.log(this.breedScore);
            }
          });
      });
  }

  

}
