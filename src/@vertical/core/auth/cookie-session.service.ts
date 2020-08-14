import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({ providedIn: 'root' })
export class CookieSessionService {
  constructor(private cookieService: CookieService) {}

  getCookieSessionId(name = 'JSESSIONID'): string {
    return this.cookieService.get(name);
  }

  setCookieSession(key: string, value: string): void {
    this.cookieService.put(key, value);
  }
}
