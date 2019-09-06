import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TagsEffects, FetchEffects } from 'app/ngrx/tags/effects';
import * as fromTags from 'app/ngrx/tags/reducers';

@NgModule({
    imports: [
        StoreModule.forFeature(fromTags.tagsFeatureKey, fromTags.reducers),

        EffectsModule.forFeature([TagsEffects, FetchEffects])
    ],
    declarations: [],
})
export class TagsModule { }