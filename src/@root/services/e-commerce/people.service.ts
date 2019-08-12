import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { SERVER_API_URL } from '@root/constants';
import { People } from '@root/models';

@Injectable()
export class PeopleService {
    extendUrl: string = SERVER_API_URL + 'api/people-extend';
    membershipUrl: string = SERVER_API_URL + 'api/membership';

    constructor(private httpClient: HttpClient) {
    }

    checkProfile(data: any) {
        console.log('check',data, this.extendUrl)
        return this.httpClient.post<People>(this.membershipUrl + '/profile', data);
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