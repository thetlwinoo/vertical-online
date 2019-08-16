import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IProducts } from '@root/models';

export function storageFactory() {
    return typeof window === undefined || typeof localStorage === undefined
        ? null
        : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
    'root-local-storage',
    { factory: storageFactory }
);

@Injectable({ providedIn: 'root' })
export class ProductCompareStorageService {
    private compareKey = 'products-compare';

    supported(): Observable<boolean> {
        return this.storage !== null
            ? of(true)
            : throwError('Local Storage Not Supported');
    }

    getCompare(): Observable<IProducts[]> {
        return this.supported().pipe(
            map(_ => this.storage.getItem(this.compareKey)),
            map((value: string | null) => (value ? JSON.parse(value) : []))
        );
    }

    addToCompare(records: IProducts[]): Observable<IProducts[]> {
        return this.getCompare().pipe(
            map((value: IProducts[]) => [...value, ...records]),
            tap((value: IProducts[]) =>
                this.storage.setItem(this.compareKey, JSON.stringify(value))
            )
        );
    }

    removeFromCompare(ids: Array<number>): Observable<IProducts[]> {
        return this.getCompare().pipe(
            map((value: IProducts[]) => value.filter(item => !ids.includes(item.id))),
            tap((value: IProducts[]) =>
                this.storage.setItem(this.compareKey, JSON.stringify(value))
            )
        );
    }

    deleteCompare(): Observable<boolean> {
        return this.supported().pipe(
            tap(() => this.storage.removeItem(this.compareKey))
        );
    }

    constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) { }
}
