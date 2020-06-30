import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IPaymentMethods, PaymentMethodTabProps } from '@eps/models';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  private previousUrlKey = 'previousUrl';
  private paymentMethodKey = 'paymentMethod';

  constructor(private $sessionStorage: SessionStorageService) {}

  storeUrl(url: string): void {
    this.$sessionStorage.store(this.previousUrlKey, url);
  }

  getUrl(): string | null | undefined {
    return this.$sessionStorage.retrieve(this.previousUrlKey);
  }

  clearUrl(): void {
    this.$sessionStorage.clear(this.previousUrlKey);
  }

  storePaymentMethod(index: number): void {
    this.$sessionStorage.store(this.paymentMethodKey, index);
  }

  getPaymentMethod(): number | null | undefined {
    return this.$sessionStorage.retrieve(this.paymentMethodKey);
  }

  clearPaymentMethod(): void {
    this.$sessionStorage.clear(this.paymentMethodKey);
  }
}
