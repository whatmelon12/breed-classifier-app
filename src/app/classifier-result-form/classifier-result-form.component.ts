import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Chart } from 'chart.js';
import * as _ from 'lodash';


import { BreedScore } from './../core/model/breed.model';
import { DataService } from './../core/services/data.service';

@Component({
  selector: 'classifier-result-form',
  templateUrl: './classifier-result-form.component.html',
  styleUrls: ['./classifier-result-form.component.scss']
})
export class ClassifierResultFormComponent implements OnInit {
  breedScore: BreedScore[] = [];
  image: File;
  imageUrl: string = '';
  scoreChart: Chart;

  titleText = '';
  scoreText = '';

  constructor(private router: Router,
    private service: DataService) {  }

  ngOnInit() {
    this.service.getImageUrl()
      .subscribe(value => {
        this.image = value;
        this.displayImage(this.image);
      });
    
    this.service.getBreedScore()
      .subscribe(value => {
        this.breedScore = value;

        this.titleText = 'La raza de su mascota es: ' + value[0].breed.name;
        this.scoreText = 'Puntaje: ' + value[0].score;

        this.generateChart();
      });
  }

  displayImage(file: File) {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(file);
  }

  generateChart() {
    this.scoreChart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: _.map(this.breedScore, 'breed.name'),
        datasets: [{
          label: '# of Votes',
          data: _.map(this.breedScore, 'score'),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  reset() {
    this.router.navigateByUrl('/uploadimage');
  }

}
