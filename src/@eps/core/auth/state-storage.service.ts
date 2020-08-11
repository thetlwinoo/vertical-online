import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IPaymentMethods, PaymentMethodTabProps } from '@eps/models';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  private previousUrlKey = 'previousUrl';
  private paymentMethodKey = 'paymentMethod';
  private keywordsKey = 'keywords';

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

  getKeywords(): string[] | null | undefined {
    return this.$sessionStorage.retrieve(this.keywordsKey);
  }

  storeKeywords(keyword: string): void {
    const currentKeywords: string[] = this.$sessionStorage.retrieve(this.keywordsKey);

    if (currentKeywords.length >= 10) {
      currentKeywords.push(keyword);
      currentKeywords.shift();
    } else {
      currentKeywords.push(keyword);
    }

    this.$sessionStorage.store(this.keywordsKey, currentKeywords);
  }

  clearKeywords(): void {
    this.$sessionStorage.clear(this.keywordsKey);
  }
}
