import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'https://auth.gardilo.com/auth',
  realm: 'jhipster',
  clientId: 'web_storefront',
};

export const environment = {
  production: true,
  keycloak: keycloakConfig,
  serverApi: {
    url: 'https://system.gardilo.com/',
  },
  client: {
    baseUrl: 'https://www.gardilo.com/',
  },
  socketConfig: {
    url: 'https://system.gardilo.com/',
    opts: {
      transports: ['websocket'],
    },
  },
};
