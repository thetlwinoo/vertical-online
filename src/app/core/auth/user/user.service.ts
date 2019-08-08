import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/env';
import { createRequestOption } from '@root/utils';
import { IUser } from 'app/core/e-commerce/_models';

@Injectable({ providedIn: 'root' })
export class UserService {

    public resourceUrl = `${environment.serverApi.baseUrl}` + 'api/users';

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
}
