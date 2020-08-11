import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private location: Location, protected keycloakService: KeycloakService) {}

  login(): void {
    const scopes = 'openid address email jhipster microprofile-jwt profile offline_access phone roles web-origins';
    // const scopes = 'openid profile offline_access';
    const options: KeycloakLoginOptions = {
      scope: scopes,
      redirectUri: `${location.origin}`,
    };
    this.keycloakService.login(options);
  }

  logout(): Promise<void> {
    const redirectUri = `${location.origin}`;
    return this.keycloakService.logout(redirectUri);
  }

  getKeycloakInstance(): any {
    return this.keycloakService.getKeycloakInstance();
  }

  register(): Promise<void> {
    const options: KeycloakLoginOptions = {
      redirectUri: `${location.origin}/register-success`,
      action: 'register',
    };

    return this.keycloakService.register(options);
  }
}
