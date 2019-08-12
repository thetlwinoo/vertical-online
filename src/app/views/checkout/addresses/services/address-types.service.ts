import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/env';
import { createRequestOption } from '@root/utils';
import { IAddressTypes } from '@root/models';

type EntityResponseType = HttpResponse<IAddressTypes>;
type EntityArrayResponseType = HttpResponse<IAddressTypes[]>;

@Injectable({ providedIn: 'root' })
export class AddressTypesService {
    public resourceUrl = `${environment.serverApi.baseUrl}` + 'api/address-types';

    constructor(protected http: HttpClient) {}

    create(addressTypes: IAddressTypes): Observable<EntityResponseType> {
        return this.http.post<IAddressTypes>(this.resourceUrl, addressTypes, { observe: 'response' });
    }

    update(addressTypes: IAddressTypes): Observable<EntityResponseType> {
        return this.http.put<IAddressTypes>(this.resourceUrl, addressTypes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAddressTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddressTypes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
