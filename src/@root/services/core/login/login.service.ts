import { Injectable } from '@angular/core';

import { AccountService } from '../auth/account.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { JhiTrackerService } from '../tracker/tracker.service';

import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { People } from '@root/models';
import * as PeopleActions from 'app/ngrx/people/people.actions';

@Injectable({ providedIn: 'root' })
export class LoginService {

    peopleState: Observable<{ people: People }>;

    constructor(
        private accountService: AccountService,
        private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider,
        private store: Store<fromApp.AppState>
    ) {
        // this.peopleState = this.store.select('people');

        // this.peopleState.take(1).subscribe(data => {
        //     console.log('People State', data);
        // });
    }

    login(credentials, callback?) {
        const cb = callback || function () { };

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(                
                data => {
                    console.log('credentials',credentials);
                    this.accountService.identity(true).then(account => {
                        console.log('login data', account);
                        const tempName = account.firstName == account.lastName ? account.firstName : account.firstName + ' ' + account.lastName;

                        const people: People = {
                            fullName: tempName,
                            preferredName: tempName,
                            searchName: tempName,
                            isPermittedToLogon: true,
                            logonName: account.login,
                            isExternalLogonProvider: false,
                            isSystemUser: false,
                            isEmployee: false,
                            isSalesPerson: false,
                            isGuestUser: true,
                            emailPromotion: 0,
                            userPreferences: '',
                            phoneNumber: '',
                            emailAddress: account.email,
                            photo: '',
                            customFields: '',
                            otherLanguages: '',
                            validFrom: new Date(),
                            validTo: new Date()
                        };

                        this.store.dispatch(new PeopleActions.FetchLoginPeople(people))

                        this.trackerService.sendActivity();
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.accountService.authenticate(null);
    }
}
