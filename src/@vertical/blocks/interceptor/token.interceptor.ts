import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { SERVER_API_URL } from '@vertical/constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private servicesEndpoint = SERVER_API_URL.replace('api', 'services');

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    console.log('request.url', request.url);
    // if (
    //     !request ||
    //     !request.url ||
    //     (request.url.startsWith('http') && !request.url.startsWith(SERVER_API_URL) && !request.url.startsWith(this.servicesEndpoint))
    //   // request.url.includes('api/account')
    // ) {
    //   return next.handle(request).toPromise();
    // }
    try {
      const token = await this.keycloakService.getToken();
      if (!!token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      // ignore
    }

    return next.handle(request).toPromise();
  }
}
