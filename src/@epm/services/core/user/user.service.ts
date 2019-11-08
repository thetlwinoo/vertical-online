import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@epm/constants';
import { createRequestOption } from '@epm/utils';
import { IUser } from '@epm/models';

@Injectable({ providedIn: 'root' })
export class UserService {

    public resourceUrl = SERVER_API_URL + 'api/users';

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
}
