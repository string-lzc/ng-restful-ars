import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  cacheMap: Map<string, Map<string, Observable<any>>> = new Map();
  constructor() {}

  public get_cache(key: string, requestStr: string): Observable<any> | undefined {
    return this.cacheMap.get(key)?.get(requestStr);
  }

  public set_cache(key: string, requestStr: string, value: Observable<any>): void {
    if (this.cacheMap.get(key)) {
      this.cacheMap.get(key) ?? new Map().set(requestStr, value);
    } else {
      this.cacheMap.set(key, new Map().set(requestStr, value));
    }
  }
}
