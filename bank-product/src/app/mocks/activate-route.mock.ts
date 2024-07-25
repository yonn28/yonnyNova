import {  convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


export class MockActivatedRoute {

  private subjectParamMap = new BehaviorSubject(convertToParamMap({ id: 'defaultId' }));


  readonly paramMap = this.subjectParamMap.asObservable();

  snapshot = {
    paramMap: this.subjectParamMap.getValue(), 
    data: { id: 'uno' } 
  };

  constructor() { }

  setParamMap(paramMap: any) {
    this.subjectParamMap.next(convertToParamMap(paramMap));
    this.snapshot.paramMap = this.subjectParamMap.getValue();
  }

  get(param: string) {
    return this.snapshot.paramMap.get(param);
  }
}