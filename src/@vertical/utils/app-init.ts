import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function initializer(keycloakService: KeycloakService): () => Promise<any> {
  const { keycloak } = environment;
  return (): Promise<any> =>
    keycloakService.init({
      config: keycloak,
      initOptions: {
        // onLoad: 'login-required',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets', '/clients/public'],
    });
}
