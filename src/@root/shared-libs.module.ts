import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//primeng
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { InplaceModule } from 'primeng/inplace';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { SliderModule } from 'primeng/slider';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        FontAwesomeModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        FontAwesomeModule,

        TableModule,
        ButtonModule,
        SplitButtonModule,
        CardModule,
        ToolbarModule,
        InputTextModule,
        DropdownModule,
        DataViewModule,
        ConfirmDialogModule,
        TabViewModule,
        CarouselModule,
        InplaceModule,
        SelectButtonModule,
        FieldsetModule,
        SliderModule,
        PanelModule,
        DialogModule,
        TreeModule,
        CheckboxModule,
        RatingModule,
        GalleriaModule,
        ProgressBarModule,
        InputSwitchModule,
        AutoCompleteModule
    ],
    providers: [
    ]
})
export class ResourceSharedLibsModule {
    static forRoot() {
        return {
            ngModule: ResourceSharedLibsModule
        };
    }
}
