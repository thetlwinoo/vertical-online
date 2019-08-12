import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/env';

@Injectable({ providedIn: 'root' })
export class ActivateService {
    private SERVER_API_URL: string = `${environment.serverApi.baseUrl}`;
    constructor(private http: HttpClient) { }

    get(key: string): Observable<any> {
        console.log('activate key',key)
        return this.http.get(this.SERVER_API_URL + 'api/activate', {
            params: new HttpParams().set('key', key)
        });
    }
}
