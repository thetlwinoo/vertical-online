import { DefaultAddressPipe } from './default-address.pipe';

describe('DefaultAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
