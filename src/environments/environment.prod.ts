export const environment = {
  production: true,
  serverApi: {
    baseUrl: 'https://system.zezawar.com/'
  },
  client: {
    baseUrl: 'https://www.zezawar.com/'
  },
  socketConfig: {
    url: 'https://system.zezawar.com/',
    opts: {
      transports: ['websocket']
    }
  }
};
