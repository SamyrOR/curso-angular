import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  tap,
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any> = new Observable();
  FIELDS = 'name,description,version,homepage';

  total: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value) => value.length > 1),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) =>
        this.http.get(this.SEARCH_URL, {
          params: { search: value, fields: this.FIELDS },
        })
      ),
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    console.log(this.queryField.value);
    let value = this.queryField.value;
    //if (value && (value = value.trim() === '')) {
    const params = {
      search: value,
      fields: this.FIELDS,
    };
    this.results$ = this.http.get(`${this.SEARCH_URL}`, { params }).pipe(
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
    // }
  }
}
