import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IStockItems } from '@eps/models';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined ? null : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken('root-local-storage', { factory: storageFactory });

@Injectable({ providedIn: 'root' })
export class StockItemCompareStorageService {
  private compareKey = 'stock-items-compare';

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

  supported(): Observable<boolean> {
    return this.storage !== null ? of(true) : throwError('Local Storage Not Supported');
  }

  getCompare(): Observable<IStockItems[]> {
    return this.supported().pipe(
      map(_ => this.storage.getItem(this.compareKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  addToCompare(records: IStockItems[]): Observable<IStockItems[]> {
    return this.getCompare().pipe(
      map((value: IStockItems[]) => [...value, ...records]),
      tap((value: IStockItems[]) => this.storage.setItem(this.compareKey, JSON.stringify(value)))
    );
  }

  removeFromCompare(ids: Array<number>): Observable<IStockItems[]> {
    return this.getCompare().pipe(
      map((value: IStockItems[]) => value.filter(item => !ids.includes(item.id))),
      tap((value: IStockItems[]) => this.storage.setItem(this.compareKey, JSON.stringify(value)))
    );
  }

  deleteCompare(): Observable<boolean> {
    return this.supported().pipe(tap(() => this.storage.removeItem(this.compareKey)));
  }
}
