import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '@root/constants';
import { createRequestOption } from '@root/utils';
import { IAddresses } from '../_models';

type EntityResponseType = HttpResponse<IAddresses>;
type EntityArrayResponseType = HttpResponse<IAddresses[]>;

@Injectable({ providedIn: 'root' })
export class AddressesService {
    public resourceUrl = SERVER_API_URL + 'api/addresses';
    public addressesExtendUrl = SERVER_API_URL + 'api/addresses-extend';

    constructor(protected http: HttpClient) { }

    create(addresses: IAddresses): Observable<EntityResponseType> {
        return this.http.post<IAddresses>(this.addressesExtendUrl, addresses, { observe: 'response' });
    }

    update(addresses: IAddresses): Observable<EntityResponseType> {
        return this.http.put<IAddresses>(this.addressesExtendUrl, addresses, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAddresses>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddresses[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    setDefault(id: number): Observable<EntityResponseType> {
        return this.http.post(this.addressesExtendUrl + '/setdefault', id, { observe: 'response' });
    }

    fetch(): Observable<EntityResponseType> {
        return this.http.get<IAddresses>(this.addressesExtendUrl + '/fetch', { observe: 'response' });
    }

    clearDefault(): Observable<EntityResponseType> {
        return this.http.post(this.addressesExtendUrl + '/clear', null, { observe: 'response' });
    }
}
