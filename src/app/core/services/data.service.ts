import { BreedScore } from './../model/breed.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private imageUrl = new BehaviorSubject<File>(undefined);
  private breedScore = new BehaviorSubject<BreedScore[]>([]);

  constructor() { }

  nextImageUrl(value: File){
    this.imageUrl.next(value);
  }

  getImageUrl(){
    return this.imageUrl.asObservable();
  }

  nextBreedScore(value: BreedScore[]){
    this.breedScore.next(value);
  }

  getBreedScore(){
    return this.breedScore.asObservable();
  }
}
