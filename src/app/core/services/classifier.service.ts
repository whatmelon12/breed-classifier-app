import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Angular 6 way of importing this classes
import { Observable, throwError } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {
  //baseUrl: string = 'https://breed-classifier.herokuapp.com/';
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  testImageFile(resource: FormData){
    return this.http.post(this.baseUrl + 'api/uploadtest', resource, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(map(response => response))
      .pipe(catchError(err => throwError(err)));
  }
}
