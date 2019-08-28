import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { SERVER_API_URL } from '@root/constants';
import { People, IPeople } from '@root/models';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IPeople>;
type EntityArrayResponseType = HttpResponse<IPeople[]>;

@Injectable()
export class PeopleService {
    extendUrl: string = SERVER_API_URL + 'api/people-extend';
    membershipUrl: string = SERVER_API_URL + 'api/membership';

    constructor(private httpClient: HttpClient) {
    }

    checkProfile(data: any): Observable<EntityResponseType> {
        return this.httpClient.post<People>(this.membershipUrl + '/profile', data, { observe: 'response' });
    }

    // getPeopleByEmailOrName(email, name) {
    //     let params = new HttpParams();
    //     params = params.append('email', email);
    //     params = params.append('name', name);

    //     return this.httpClient.get<People>(this.extendUrl, {
    //         params: params
    //     })
    // }
}