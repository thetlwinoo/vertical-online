import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/env';

@Injectable({ providedIn: 'root' })
export class PasswordService {
    private SERVER_API_URL: string = `${environment.serverApi.baseUrl}`;
    constructor(private http: HttpClient) {}

    save(newPassword: string, currentPassword: string): Observable<any> {
        return this.http.post(this.SERVER_API_URL + 'api/account/change-password', { currentPassword, newPassword });
    }
}
