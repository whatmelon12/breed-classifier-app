import { Router } from '@angular/router';
import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { Chart, ChartData } from 'chart.js';
import * as _ from 'lodash';

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
  imageUrl: string;
  uploadPercent = 0;

  constructor(private fb: FormBuilder,
    private router: Router,
    private classiService: ClassifierService,
    private dataService: DataService) { }

  ngOnInit() {
    this.form = this.fb.group({
      image: []
    });

    this.form.get('image').valueChanges
      .subscribe(file => {
        if (file) {
          let formData: FormData = new FormData();
          formData.append('image', file, file.name);

          this.classiService.testImageFile(formData)
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.uploadPercent = (event.loaded / event.total) * 100;
              } else if (event.type === HttpEventType.Response) {
                let breedScore = event.body as BreedScore[];
                
                this.dataService.nextImageUrl(file);
                this.dataService.nextBreedScore(breedScore);

                this.router.navigateByUrl('/imageresult');
              }
            });
        }
      });
  }

  get image() {
    return this.form.get('image').value as File;
  }

  set image(value) {
    this.form.get('image').setValue(value);
  }

}
