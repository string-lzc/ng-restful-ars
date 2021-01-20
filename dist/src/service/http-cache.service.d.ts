import { Observable } from 'rxjs';
export declare class HttpCacheService {
    cacheMap: Map<string, Map<string, Observable<any>>>;
    constructor();
    get_cache(key: string, requestStr: string): Observable<any> | undefined;
    set_cache(key: string, requestStr: string, value: Observable<any>): void;
}
