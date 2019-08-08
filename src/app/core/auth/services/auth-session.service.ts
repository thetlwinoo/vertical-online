import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@app/env';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    private SERVER_API_URL: string = `${environment.serverApi.baseUrl}`;

    constructor(private http: HttpClient) {}

    logout(): Observable<any> {
        // logout from the server
        return this.http.post(this.SERVER_API_URL + 'api/logout', {}, { observe: 'response' }).pipe(
            map((response: HttpResponse<any>) => {
                return response;
            })
        );
    }
}
