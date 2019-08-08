import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '@app/env';
import { People } from '../_models';

@Injectable()
export class PeopleService {
    url: string = `${environment.serverApi.baseUrl}` + 'api/people-extend';
    membershipUrl: string = `${environment.serverApi.baseUrl}` + 'api/membership';

    constructor(private httpClient: HttpClient) {
    }

    checkProfile(data: any) {
        console.log('check',data, this.url)
        return this.httpClient.post<People>(this.membershipUrl + '/profile', data);
    }

    // getPeopleByEmailOrName(email, name) {
    //     let params = new HttpParams();
    //     params = params.append('email', email);
    //     params = params.append('name', name);

    //     return this.httpClient.get<People>(this.url, {
    //         params: params
    //     })
    // }
}