import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/env';

@Injectable({ providedIn: 'root' })
export class Register {
    private SERVER_API_URL: string = `${environment.serverApi.baseUrl}`;
    constructor(private http: HttpClient) { }

    save(account: any): Observable<any> {
        return this.http.post(this.SERVER_API_URL + 'api/register', account);
    }
}
